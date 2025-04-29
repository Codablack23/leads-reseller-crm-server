import { RequestHandler } from "express";
import { LeadService } from "./lead.service";

class LeadController {
  constructor(private leadService: LeadService) {}

  /**
   * GET /leads
   * Retrieves all leads.
   */
  getLeads: RequestHandler = async (req, res, next) => {
    try {
      const leads = await this.leadService.getLeads();
      res.status(200).json({
        status: "success",
        data: { leads },
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * GET /leads/:id
   * Retrieves a single lead by ID.
   */
  getLead: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const lead = await this.leadService.getLead(id);
      res.status(200).json({
        status: "success",
        data: { lead },
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * POST /leads
   * Creates a new lead.
   */
  addLead: RequestHandler = async (req, res, next) => {
    try {
      const newLead = await this.leadService.addLead(req.body);
      res.status(201).json({
        status: "success",
        data: { lead: newLead },
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * PUT /leads/:id
   * Updates an existing lead by ID.
   */
  updateLead: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedLead = await this.leadService.updateLead(id, req.body);
      res.status(200).json({
        status: "success",
        data: { lead: updatedLead },
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * DELETE /leads/:id
   * Deletes a lead by ID.
   */
  deleteLead: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.leadService.deleteLead(id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  };
}

export default new LeadController(new LeadService()) as LeadController;
