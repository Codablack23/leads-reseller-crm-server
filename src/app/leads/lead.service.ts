import { LeadEntity } from "@common/entities/lead.entity";
import { StatusMapEntity } from "@common/entities/statusMap.entity";
import { LeadStatus, StatusMapType } from "@common/enums";
import AppResponse from "@common/services/service.response";
import { AppDataSource } from "@core/core.db";
import { NotFoundError } from "@core/core.error";
import { PaginationUtility, SanitizerProvider } from "@lib/utils";
import { ExtendedObject, FtdQuery, Pagination } from "src/types";


export class LeadService {
  private leadRepository = AppDataSource.getRepository(LeadEntity);
  private statusMapRepository = AppDataSource.getRepository(StatusMapEntity);

  /**
   * Fetch all leads with related traffic, brand, and affiliate data.
   */
  async getLeads(ftdQuery?: FtdQuery, pagination?: Pagination) {


    const statistics = await this.getLeadStats()


    // Build where clause dynamically
    const whereClause: any = {};
    if (ftdQuery && typeof ftdQuery.is_ftd === "boolean") {
      whereClause.is_ftd = ftdQuery.is_ftd;
    }

    // Default pagination values
    const limit = pagination?.limit ?? 10;
    const page = pagination?.page ?? 1;
    const offset = (page - 1) * limit;

    // Fetch leads and status maps concurrently
    const [[leadsRes, count], statusMap] = await Promise.all([
      this.leadRepository.findAndCount({
        where: whereClause,
        relations: {
          traffic: { brand: true },
          affiliate: true,
          statusMap: { status: true }
        },
        take: limit,
        skip: offset,
      }),
      this.statusMapRepository.find()
    ]);

    // Create maps for quick lookup
    // const groupMapByType = (type: StatusMapType) => {
    //   return new Map(
    //     statusMap
    //       .filter(item => item.status_type === type)
    //       .map(item => [item.from_status.toLowerCase(), item])
    //   );
    // };

    // const callStatusMap = groupMapByType(StatusMapType.CALL);
    // const ftdStatusMap = groupMapByType(StatusMapType.FTD);
    // const mainStatusMap = groupMapByType(StatusMapType.STATUS);

    // Transform leads
    const leads = leadsRes.map((lead: ExtendedObject<LeadEntity>) => {
      // const callStatus = callStatusMap.get(lead.call_status.toLowerCase());
      // const ftdStatus = ftdStatusMap.get(lead.call_status.toLowerCase());
      // const status = mainStatusMap.get(lead.call_status.toLowerCase());

      // if (callStatus) {
      //   lead.original_call_status = lead.call_status
      //   lead.call_status = callStatus.from_status
      // };
      // if (lead.is_ftd && ftdStatus) {
      //   lead.original_ftd_status = lead.ftd_status
      //   lead.ftd_status = ftdStatus.from_status
      // };
      // if (status) {
      //   lead.original_status = lead.status
      //   lead.status = status.from_status
      // };

      return lead;
    });

    // Build pagination metadata
    const paginationMeta = PaginationUtility.getPaginationMetaData(count, limit, page);

    const sortedLeads = [...leads].sort((a, b) => {
      const dateA = new Date(a.createdAt.toString()).getTime()
      const dateB = new Date(b.createdAt.toString()).getTime()

      return dateB - dateA
    })

    return {
      leads: sortedLeads,
      statistics,
      total: count,
      pagination: paginationMeta,
    };
  }


  /**
   * Fetch a single lead by ID, throwing if not found.
   */
  async getLead(id: string) {
    const lead: ExtendedObject<LeadEntity> | null = await this.leadRepository.findOne({
      where: { id },
      relations: {
        traffic: {
          brand: true
        },
        affiliate: true,
        statusMap: {
          status: true
        }
      },
    });

    if (!lead) {
      throw new NotFoundError(`Lead with ID ${id} not found`);
    }
    return lead;
  }

  /**
   * Create and save a new lead.
   */
  async addLead(newLeadData: Partial<LeadEntity>): Promise<LeadEntity> {
    const lead = this.leadRepository.create(newLeadData);
    return this.leadRepository.save(lead);
  }

  /**
   * Update an existing lead by ID.
   * Throws if the lead does not exist.
   */
  async updateLead(id: string, updatedLeadData: Partial<LeadEntity>): Promise<LeadEntity> {
    const lead = await this.getLead(id);
    this.leadRepository.merge(lead, updatedLeadData);
    return this.leadRepository.save(lead);
  }

  /**
   * Delete a lead by ID.
   * Throws if the lead does not exist.
   */
  async deleteLead(id: string): Promise<void> {
    const lead = await this.getLead(id);
    await this.leadRepository.remove(lead);
  }

  async getLeadStats() {
    const [
      successfulLeads,
      rejectedLeads,
      convertedLeads
    ] = await Promise.all([
      this.leadRepository.count({
        where: {
          lead_status: LeadStatus.ACCEPTED
        }
      }),
      this.leadRepository.count({
        where: {
          lead_status: LeadStatus.REJECTED
        }
      }),
      this.leadRepository.count({
        where: {
          is_ftd: true
        }
      })
    ])

    const data = {
      successfulLeads,
      rejectedLeads,
      convertedLeads,
    }

    return data
  }
}
