import { LeadEntity } from "@common/entities/lead.entity";
import { AppDataSource } from "@core/core.db";
import { NotFoundError } from "@core/core.error";

export class LeadService {
  private leadRepository = AppDataSource.getRepository(LeadEntity);

  /**
   * Fetch all leads with related traffic, brand, and affiliate data.
   */
  async getLeads(): Promise<LeadEntity[]> {
    return this.leadRepository.find({
      relations: { traffic: { brand: true, affiliate: true } },
    });
  }

  /**
   * Fetch a single lead by ID, throwing if not found.
   */
  async getLead(id: string): Promise<LeadEntity> {
    const lead = await this.leadRepository.findOne({
      where: { id },
      relations: { traffic: { brand: true, affiliate: true } },
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
}
