import { APIKeyEntity } from "@common/entities/apiKey.entity"
import { AppDataSource } from "@core/core.db"
import { LeadRequestData } from "../data"
import { TrafficEntity } from "@common/entities/traffic.entity"
import { LeadEntity } from "@common/entities/lead.entity"
import { DateTime } from "luxon"
import { BadRequest } from "@core/core.error"
import countries from "@lib/data/countries.json"
import { SanitizerProvider } from "@lib/utils"

export class LeadsAPIService {
    private trafficRepository = AppDataSource.getRepository(TrafficEntity)
    private leadRepository = AppDataSource.getRepository(LeadEntity)
    private apiKeyRepository = AppDataSource.getRepository(APIKeyEntity)


    parseCountry(country: string) {
        const trimmedInput = country.trim().toLowerCase();

        const searchCountry = countries.find(({ name, cca2, cca3 }) => {
            const common = name?.common?.toLowerCase();
            const official = name?.official?.toLowerCase();
            const code = cca3?.toLowerCase();
            const code2 = cca2?.toLowerCase();

            return (
                common === trimmedInput ||
                official === trimmedInput ||
                code === trimmedInput ||
                code2 === trimmedInput
            );
        });

        if (!searchCountry) {
            throw new BadRequest("Invalid country name");
        }

        return `${searchCountry.cca3}-${searchCountry.name.common}`;
    }


    async getAffiliateTraffic(affiliateId: string, countryString: string) {
        // Parse country to system format
        const country = this.parseCountry(countryString);

        // Fetch traffics with related leads (to count leads per traffic)
        const traffics = await this.trafficRepository.find({
            where: { country, affiliate: { id: affiliateId } },
            relations: { lead: true },
        });

        if (traffics.length === 0) {
            throw new BadRequest("Sorry you cannot send in leads for this country");
        }

        // Filter traffics valid for current time and day
        const validTraffics = traffics.filter(t => {
            const isNowTimeSupported = this.validateTimeRange(t.openingTime, t.closingTime);
            const isTodaySupported = this.validateTrafficDays(t.trafficDays.split(","));
            return isNowTimeSupported && isTodaySupported;
        });

        if (validTraffics.length === 0) {
            throw new BadRequest("Sorry you cannot send leads at this time or day");
        }

        // Sort traffics by descending priority (highest priority first)
        const sortedTraffics = [...validTraffics].sort((a, b) => b.priority - a.priority);

        // Get today's date string (to filter leads created today)
        const today = new Date().toISOString().split("T")[0];

        // Helper: count leads created today for a given traffic
        const countTodayLeads = (traffic: typeof traffics[0]) => {
            return traffic.lead.filter(lead => {
                const leadDate = lead.createdAt.toISOString().split("T")[0];
                return leadDate === today;
            }).length;
        };

        // Track how many leads have been assigned to each traffic in this request cycle (weight distribution)
        // Since we assign only one lead per request, this is basically to check if weight allows assignment.
        // Ideally, you might track this globally (e.g., cache or DB) if multiple leads per second are possible.
        // For this example, assume 0 leads assigned this cycle (or extend if you keep state)
        const assignedThisCycle = new Map<string, number>();

        // Find first eligible traffic based on priority, weight, and daily cap
        for (const traffic of sortedTraffics) {
            const todayLeadCount = countTodayLeads(traffic);

            // Daily cap check
            if (todayLeadCount >= traffic.dailyCap) {
                continue; // daily cap reached, skip this traffic
            }

            // Weight distribution check:
            // For simplicity assume 0 assigned this cycle if no global tracking yet
            const assignedCount = assignedThisCycle.get(traffic.id) ?? 0;
            if (assignedCount >= traffic.weight) {
                continue; // weight quota reached, skip this traffic
            }

            // Eligible traffic found, update assignedThisCycle count and return traffic
            assignedThisCycle.set(traffic.id, assignedCount + 1);

            return traffic; // return this traffic for lead assignment
        }

        // If none found, throw error
        throw new BadRequest("No traffics available for lead assignment after checks");
    }



    validateTimeRange(openingTime: string, closingTime: string): boolean {
        const now = DateTime.now();

        const format = openingTime.length === 5 ? 'HH:mm' : 'HH:mm:ss';

        const openDT = DateTime.fromFormat(openingTime, format).set({
            year: now.year,
            month: now.month,
            day: now.day,
        });

        const closeDT = DateTime.fromFormat(closingTime, format).set({
            year: now.year,
            month: now.month,
            day: now.day,
        });

        if (closeDT < openDT) {
            // Overnight range: e.g. 22:00 - 04:00
            return now >= openDT || now <= closeDT;
        }

        return now >= openDT && now <= closeDT;
    }

    validateTrafficDays(trafficDays: string[]) {
        const now = DateTime.now();
        const currentDayName = now.toFormat('cccc').toLowerCase(); // full day name lowercase
        return trafficDays.some(day => day.trim().toLowerCase() === currentDayName);
    }



    async getUserLeads(apiKey: string) {
        const { affiliate, brand } = await this.getAffiliateFromAPIKey(apiKey)

        if (affiliate) {
            const leads = this.leadRepository.find({
                where: { traffic: { affiliate } }
            })

            return leads
        }
        const leads = this.leadRepository.find({
            where: { traffic: { brand } }
        })

        return leads

    }
    async addLead(apiKey: string, leadData: LeadRequestData) {
        const { affiliate } = await this.getAffiliateFromAPIKey(apiKey)

        if (!affiliate) throw new BadRequest("Invalid API Key for affiliate")

        const traffic = await this.getAffiliateTraffic(affiliate?.id as string, leadData.country)
        
        const newLead =  this.leadRepository.create({
            ...leadData,
            traffic,
        })

        const lead = await this.leadRepository.save(newLead)
        const sanitizedLead = SanitizerProvider.sanitizeObject(lead,["traffic.lead"])

        return {lead:sanitizedLead}
    }

    private async getAffiliateFromAPIKey(apiKey: string) {
        const apiKeyRes = await this.apiKeyRepository.findOne({
            where: {
                id: apiKey
            },
            relations: ["affiliate", "brand"]
        })

        const affiliate = apiKeyRes?.affiliate
        const brand = apiKeyRes?.brand

        return { affiliate, brand }
    }
}