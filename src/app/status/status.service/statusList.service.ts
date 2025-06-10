import { StatusListEntity } from "@common/entities/statusList.entity";
import { AppDataSource } from "@core/core.db";
import { NotFoundError } from "@core/core.error";
import { PaginationUtility } from "@lib/utils";
import { Pagination } from "src/types";

export class StatusListService {
  private statusListRepository = AppDataSource.getRepository(StatusListEntity);

  /**
   * Fetch all leads with related traffic, brand, and affiliate data.
   */
  async getStatusList(pagination?: Pagination){
    // Build where clause dynamically
    const whereClause: any = {};
    // Default pagination values
    const limit = pagination?.limit ?? 10;
    const page = pagination?.page ?? 1;
    const offset = (page - 1) * limit;

    // Query leads with pagination and relations
    const [status_list, count] = await this.statusListRepository.findAndCount({
      where: whereClause,
      take: limit,
      skip: offset,
    });

    // Get pagination metadata
    const paginationMeta = PaginationUtility.getPaginationMetaData(count, limit, page);

    return { status_list, total: count, pagination: paginationMeta };
  }

  /**
   * Fetch a single lead by ID, throwing if not found.
   */
  async getStatus(id: string): Promise<StatusListEntity> {
    const status = await this.statusListRepository.findOne({
      where: { id },
    });

    if (!status) {
      throw new NotFoundError(`Status Map with ID ${id} not found`);
    }

    return status;
  }

  /**
   * Create and save a new lead.
   */
  async addStatus(newStatusMap: Partial<StatusListEntity>): Promise<StatusListEntity> {
    const newStatus = this.statusListRepository.create(newStatusMap);
    return this.statusListRepository.save(newStatus);
  }

  /**
   * Update an existing lead by ID.
   * Throws if the lead does not exist.
   */
  async updateStatus(id: string, updatedLeadData: Partial<StatusListEntity>): Promise<StatusListEntity> {
    const status = await this.getStatus(id);
    this.statusListRepository.merge(status, updatedLeadData);
    return this.statusListRepository.save(status);
  }

  /**
   * Delete a lead by ID.
   * Throws if the lead does not exist.
   */
  async deleteStatus(id: string): Promise<void> {
    const status = await this.getStatus(id);
    await this.statusListRepository.remove(status);
  }
}
