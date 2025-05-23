import { RequestHandler } from "express";
import { StatusMapService } from "./status.service";
import { QueryProvider } from "@common/providers";
import AppResponse from "@common/services/service.response";

class StatuMapController {
  constructor(private statusMapService: StatusMapService) {}

  /**
   * GET /leads
   * Retrieves all leads.
   */
  getStatusMap: RequestHandler = async (req, res, next) => {
    try {
      const paginatedQuery = QueryProvider.usePagination(req)
      const data = await this.statusMapService.getStatusMap(paginatedQuery);
      return AppResponse.sendOkResponse(res,data)
    } catch (err) {
      next(err);
    }
  };

  /**
   * GET /leads/:id
   * Retrieves a single lead by ID.
   */
  getStatusMapById: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const status_map = await this.statusMapService.getStatusMapById(id);
      return AppResponse.sendOkResponse(res,{status_map})
    } catch (err) {
      next(err);
    }
  };

  /**
   * POST /leads
   * Creates a new lead.
   */
  addStatusMap: RequestHandler = async (req, res, next) => {
    try {
      const status_map = await this.statusMapService.addStatusMap(req.body);
      return AppResponse.sendOkResponse(res,{status_map})
    } catch (err) {
      next(err);
    }
  };

  /**
   * PUT /leads/:id
   * Updates an existing lead by ID.
   */
  updateStatusMap: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const status_map = await this.statusMapService.updateStatusMap(id, req.body);
      return AppResponse.sendOkResponse(res,{status_map})

    } catch (err) {
      next(err);
    }
  };

  /**
   * DELETE /leads/:id
   * Deletes a lead by ID.
   */
  deleteStatusMap: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.statusMapService.deleteStatusMap(id);
      AppResponse.sendOkResponse(res,{id},"Stats deleted successfully")
    } catch (err) {
      next(err);
    }
  };
}

export default new StatuMapController(new StatusMapService()) as StatuMapController;
