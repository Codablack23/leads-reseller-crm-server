import { AffiliateEntity } from "@common/entities/affiliate.entity";
import { LeadEntity } from "@common/entities/lead.entity";
import { StatusListEntity } from "@common/entities/statusList.entity";
import { StatusMapEntity } from "@common/entities/statusMap.entity";
import { AppDataSource } from "@core/core.db";
import { BadRequest, NotFoundError } from "@core/core.error";
import { PaginationUtility } from "@lib/utils";
import { Pagination } from "src/types";

interface AddStatusMapRequest {
  status_text: string,
  status_id: string,
  lead_id?: string,
  affiliate_id?: string,
  map_type: "lead" | "affiliate"
}

export class StatusMapService {
  private statusMapRepository = AppDataSource.getRepository(StatusMapEntity);
  private statusListRepository = AppDataSource.getRepository(StatusListEntity);
  private leadRepository = AppDataSource.getRepository(LeadEntity);
  private affiliateRepository = AppDataSource.getRepository(AffiliateEntity);

  /**
   * Fetch all leads with related traffic, brand, and affiliate data.
   */
  async getUnmappedStatus(pagination?: Pagination) {
    // Build where clause dynamically
    const whereClause: any = {};
    // Default pagination values
    const limit = pagination?.limit ?? 10;
    const page = pagination?.page ?? 1;
    const offset = (page - 1) * limit;

    const [unmapped_status, total] = await this.leadRepository
      .createQueryBuilder("lead")
      .leftJoinAndSelect("lead.statusMap", "statusMap")
      .leftJoinAndSelect("lead.traffic", "traffic")
      .leftJoinAndSelect("traffic.affiliate", "affiliate")
      .where("statusMap.id IS NULL") // only leads with no statusMap
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    // Get pagination metadata
    const paginationMeta = PaginationUtility.getPaginationMetaData(total, limit, page);

    return { unmapped_status, total, pagination: paginationMeta };
  }
  /**
 * Fetch all leads with related traffic, brand, and affiliate data.
 */
  async getStatusMap(pagination?: Pagination) {
    // Build where clause dynamically
    const whereClause: any = {};
    // Default pagination values
    const limit = pagination?.limit ?? 10;
    const page = pagination?.page ?? 1;
    const offset = (page - 1) * limit;

    // Query leads with pagination and relations
    const [status_map, count] = await this.statusMapRepository.findAndCount({
      where: whereClause,
      relations:["status"],
      take: limit,
      skip: offset,
    });

    // Get pagination metadata
    const paginationMeta = PaginationUtility.getPaginationMetaData(count, limit, page);

    return { status_map, total: count, pagination: paginationMeta };
  }

  /**
   * Fetch a single lead by ID, throwing if not found.
   */
  async getStatusMapById(id: string): Promise<StatusMapEntity> {
    const status_map = await this.statusMapRepository.findOne({
      where: { id },
    });

    if (!status_map) {
      throw new NotFoundError(`Status Map with ID ${id} not found`);
    }

    return status_map;
  }

  /**
   * Create and save a new lead.
   */
  async addStatusMap({
    status_id,
    status_text,
    lead_id,
    affiliate_id,
  }: AddStatusMapRequest) {

    const [lead, status, affiliate] = await Promise.all([
      this.leadRepository.findOne({ where: { id: lead_id } }),
      await this.statusListRepository.findOne({ where: { id: status_id } }),
      await this.affiliateRepository.findOne({ where: { id: affiliate_id } })
    ])

    if (!lead) throw new BadRequest("lead not found")
    if (!status) throw new BadRequest("Status not found")
    if (!affiliate) throw new BadRequest("Affiliate not found")

    const statusMap = this.statusMapRepository.create({ lead, status, affiliate, status_text })

    const newStatusMap = await this.statusMapRepository.save(statusMap)

    return newStatusMap;
  }

  /**
   * Update an existing lead by ID.
   * Throws if the lead does not exist.
   */
  async updateStatusMap(id: string, updatedLeadData: Partial<StatusMapEntity>): Promise<StatusMapEntity> {
    const lead = await this.getStatusMapById(id);
    this.statusMapRepository.merge(lead, updatedLeadData);
    return this.statusMapRepository.save(lead);
  }

  /**
   * Delete a lead by ID.
   * Throws if the lead does not exist.
   */
  async deleteStatusMap(id: string): Promise<void> {
    const lead = await this.getStatusMapById(id);
    await this.statusMapRepository.remove(lead);
  }
}
