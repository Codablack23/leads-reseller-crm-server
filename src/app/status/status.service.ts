import { StatusMapEntity } from "@common/entities/statusMap.entity";
import { AppDataSource } from "@core/core.db";
import { NotFoundError } from "@core/core.error";
import { PaginationUtility } from "@lib/utils";
import { Pagination } from "src/types";

export class StatusMapService {
  private statusMapRepository = AppDataSource.getRepository(StatusMapEntity);

  /**
   * Fetch all leads with related traffic, brand, and affiliate data.
   */
  async getStatusMap(pagination?: Pagination){
    // Build where clause dynamically
    const whereClause: any = {};
    // Default pagination values
    const limit = pagination?.limit ?? 10;
    const page = pagination?.page ?? 1;
    const offset = (page - 1) * limit;

    // Query leads with pagination and relations
    const [leads, count] = await this.statusMapRepository.findAndCount({
      where: whereClause,
      take: limit,
      skip: offset,
    });

    // Get pagination metadata
    const paginationMeta = PaginationUtility.getPaginationMetaData(count, limit, page);

    return { leads, total: count, pagination: paginationMeta };
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
  async addStatusMap(newStatusMap: Partial<StatusMapEntity>): Promise<StatusMapEntity> {
    const lead = this.statusMapRepository.create(newStatusMap);
    return this.statusMapRepository.save(lead);
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
