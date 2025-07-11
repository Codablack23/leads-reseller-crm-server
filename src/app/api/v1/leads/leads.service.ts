import { APIKeyEntity } from "@common/entities/apiKey.entity";
import { AppDataSource } from "@core/core.db";
import { LeadRequestData } from "../data";
import { TrafficEntity } from "@common/entities/traffic.entity";
import { AffiliateEntity } from "@common/entities/affiliate.entity";
import { LeadEntity } from "@common/entities/lead.entity";
import { DateTime } from "luxon";
import { BadRequest } from "@core/core.error";
import countries from "@lib/data/countries.json";
import { SanitizerProvider } from "@lib/utils";
import { LeadStatus } from "@common/enums";
import { LeadFtdStatusRequestData, LeadStatusRequestData } from "@interfaces/index";
import AppResponse from "@common/services/service.response";

/**
 * LeadsAPIService handles lead validation, assignment, and affiliate tracking.
 */
export class LeadsAPIService {
  private trafficRepository = AppDataSource.getRepository(TrafficEntity);
  private leadRepository = AppDataSource.getRepository(LeadEntity);
  private apiKeyRepository = AppDataSource.getRepository(APIKeyEntity);

  /**
   * Parses and standardizes a country input to system format.
   * Throws if no valid match is found.
   */
  parseCountry(country: string): string {
    const trimmedInput = country.trim().toLowerCase();

    const match = countries.find(({ name, cca2, cca3 }) =>
      [name?.common, name?.official, cca2, cca3].some(part =>
        part?.toLowerCase() === trimmedInput
      )
    );

    if (!match) throw new BadRequest("Invalid country name");

    return `${match.cca3}-${match.name.common}`;
  }

  /**
   * Gets the primary non-English language of a country.
   * Defaults to 'eng' if none found.
   */
  getCountryLanguage(country: string): string {
    const input = country.trim().toLowerCase();

    const matched = countries.find(({ name, cca2, cca3 }) =>
      [name?.common, name?.official, cca2, cca3].some(part =>
        part?.toLowerCase() === input
      )
    );

    if (!matched) throw new BadRequest("Invalid country name");

    const nonEnglish = Object.keys(matched.languages || {}).filter(
      lang => lang !== "eng"
    );

    return nonEnglish[0] || "eng";
  }

  /**
   * Retrieves the most eligible traffic for an affiliate within a country.
   */
  async getAffiliateTraffic(
    affiliateId: string,
    countryInput: string
  ): Promise<[TrafficEntity | null, string | null]> {
    try {
      const country = this.parseCountry(countryInput);

      const traffics = await this.trafficRepository.find({
        where: { country, affiliate: { id: affiliateId } },
        relations: { lead: true },
      });

      if (!traffics.length) throw new BadRequest("Country not allowed");

      const valid = traffics.filter(t =>
        this.validateTimeRange(t.openingTime, t.closingTime) &&
        this.validateTrafficDays(t.trafficDays)
      );

      if (!valid.length) throw new BadRequest("Invalid time/day for leads");

      const today = new Date().toISOString().split("T")[0];

      const assigned = new Map<string, number>();

      for (const traffic of valid.sort((a, b) => b.priority - a.priority)) {
        const todayCount = this.countTodayLeads(traffic, today);

        if (todayCount >= traffic.dailyCap) continue;

        const count = assigned.get(traffic.id) ?? 0;

        if (count >= traffic.weight) continue;

        assigned.set(traffic.id, count + 1);

        return [traffic, null];
      }

      throw new BadRequest("No eligible traffic found");
    } catch (err) {
      return [null, (err as Error).message];
    }
  }

  /**
   * Checks whether the current time falls within the given time range.
   */
  validateTimeRange(openingTime: string, closingTime: string): boolean {
    const now = DateTime.now();

    const format = openingTime.length === 5 ? "HH:mm" : "HH:mm:ss";

    const open = DateTime.fromFormat(openingTime, format).set(now.toObject());
    const close = DateTime.fromFormat(closingTime, format).set(now.toObject());

    if (close < open) {
      // Overnight range
      return now >= open || now <= close;
    }

    return now >= open && now <= close;
  }

  /**
   * Checks if the current day matches any traffic active days.
   */
  validateTrafficDays(days: string[]): boolean {
    const today = DateTime.now().toFormat("cccc").toLowerCase();

    return days.some(day => day.trim().toLowerCase() === today);
  }

  /**
   * Fetches leads for an affiliate or brand using their API key.
   */
  async getUserLeads(apiKey: string) {
    const { affiliate, brand } = await this.getAffiliateFromAPIKey(apiKey);


    console.log({ affiliate, brand })

    const affiliateLeads = await this.leadRepository.find({
      where: {
        affiliate,
      }
    })

    const brandLeads = await this.leadRepository.find({
      where: {
        traffic: { brand }
      }
    });

    if (affiliate) return affiliateLeads;
    if (brand) return brandLeads;

    return []

  }

  async addLeadData(affiliate: AffiliateEntity, leadData: LeadRequestData) {
    const affiliateId = affiliate.id;
    const country = this.parseCountry(leadData.country);
    const language = this.getCountryLanguage(leadData.country);
    const today = new Date().toISOString().split("T")[0];

    const traffics = await this.trafficRepository.find({
      where: { country, affiliate: { id: affiliateId } },
      relations: { lead: true },
    });

    if (!traffics.length) {
      await this.saveAndSanitizeLead({
        ...leadData,
        affiliate,
        lead_status: LeadStatus.REJECTED,
        rejection_reason: "Affiliate has no traffic configured for the specified country",
      });

      throw new BadRequest("Affiliate has no traffic configured for the specified country");
    }

    const valid = traffics.filter(t =>
      this.validateTimeRange(t.openingTime, t.closingTime) &&
      this.validateTrafficDays(t.trafficDays)
    );

    if (!valid.length) {
      await this.saveAndSanitizeLead({
        ...leadData,
        affiliate,
        lead_status: LeadStatus.REJECTED,
        rejection_reason: "Lead was submitted outside the traffic's active time or day",
      });

      throw new BadRequest("Lead was submitted outside the traffic's active time or day");
    }

    const assigned = new Map<string, number>();

    for (const traffic of valid.sort((a, b) => b.priority - a.priority)) {
      const todayCount = this.countTodayLeads(traffic, today);

      if (todayCount >= traffic.dailyCap) {
        await this.saveAndSanitizeLead({
          ...leadData,
          affiliate,
          lead_status: LeadStatus.REJECTED,
          rejection_reason: "Traffic has reached its daily lead limit",
        });

        if (traffic.skipFallback) {
          throw new BadRequest("Traffic has reached its daily lead limit");
        }

        continue;
      }

      const count = assigned.get(traffic.id) ?? 0;
      if (count >= traffic.weight) continue;

      assigned.set(traffic.id, count + 1);

      return this.saveAndSanitizeLead({
        ...leadData,
        traffic,
        affiliate,
        language,
        lead_status: LeadStatus.ACCEPTED,
      });
    }

    // If no traffic was accepted after all checks
    await this.saveAndSanitizeLead({
      ...leadData,
      affiliate,
      lead_status: LeadStatus.REJECTED,
      rejection_reason: "No traffics available for lead assignment after checks",
    });

    throw new BadRequest("No traffics available for lead assignment after checks");
  }


  /**
   * Saves and sanitizes a lead object.
   */
  private async saveAndSanitizeLead(payload: Partial<LeadEntity>) {
    const lead = this.leadRepository.create(payload);

    const saved = await this.leadRepository.save(lead);

    return SanitizerProvider.sanitizeObject(saved, ["traffic.lead"]);
  }

  /**
   * Counts how many leads were created today for a given traffic.
   */
  private countTodayLeads(traffic: TrafficEntity, today: string): number {
    return traffic.lead.filter(l =>
      l.createdAt.toISOString().split("T")[0] === today
    ).length;
  }

  /**
   * Adds a lead using an API key to fetch affiliate.
   */
  async addLead(apiKey: string, leadData: LeadRequestData) {
    const { affiliate } = await this.getAffiliateFromAPIKey(apiKey);

    if (!affiliate) throw new BadRequest("Invalid API Key for affiliate");

    const lead = await this.addLeadData(affiliate, leadData);

    return { lead };
  }

  /**
   * Resolves affiliate and brand information from API key.
   */
  private async getAffiliateFromAPIKey(apiKey: string) {
    const apiKeyRes = await this.apiKeyRepository.findOne({
      where: { id: apiKey },
      relations: ["affiliate", "brand"],
    });

    return {
      affiliate: apiKeyRes?.affiliate,
      brand: apiKeyRes?.brand,
    };
  }

  async updateLeadStatus(apiKey: string, leadStatusRequestData: LeadStatusRequestData) {

    const { affiliate } = await this.getAffiliateFromAPIKey(apiKey);

    await Promise.all(leadStatusRequestData.lead_update.map((update) => {
      return async () => {

        const lead = await this.leadRepository.findOne({
          where: {
            affiliate,
            id: update.lead_id
          }
        })

        if (!lead) {
          throw new BadRequest("Lead does not exist")
        }

        lead.status = update.status;
        lead.call_status = update.call_status;
        await this.leadRepository.save(lead);

      }
    }))

  }
  async updateLeadFtdStatus(apiKey: string, leadStatusRequestData: LeadFtdStatusRequestData) {

    const { affiliate } = await this.getAffiliateFromAPIKey(apiKey);


    await Promise.all(leadStatusRequestData.lead_update.map((update) => {
      return async () => {

        const lead = await this.leadRepository.findOne({
          where: {
            affiliate,
            id: update.lead_id
          }
        })

        if (!lead) {
          throw new BadRequest("Lead does not exist")
        }

        lead.is_ftd = true;
        lead.ftd_status = update.ftd_status;
        lead.ftd_date = update.ftd_date
        await this.leadRepository.save(lead);

      }
    }))

  }

}
