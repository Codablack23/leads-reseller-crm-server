import { RequestHandler } from "express";
import { LeadsAPIService } from "./leads.service";
import AppResponse from "@common/services/service.response";
import { QueryProvider } from "@common/providers";
import { LeadQuery } from "src/types";

class LeadsAPIController {
    constructor(private leadApiService: LeadsAPIService) { }
    getLeads: RequestHandler = async (req, res, next) => {
        try {
            const apiKey = req.query.apiKey
            const leadQuery = QueryProvider.extractQuery<LeadQuery>(req)
            const paginatedQuery = QueryProvider.usePagination(req)
            const data = await this.leadApiService.getUserLeads(apiKey as string,leadQuery,paginatedQuery)
            AppResponse.sendOkResponse(res, data, "Leads fetched successfully")
        } catch (error) {
            next(error)
        }
    }
    addLead: RequestHandler = async (req, res, next) => {
        const apiKey = req.query.apiKey as string
        try {
            const lead = await this.leadApiService.addLead(apiKey, req.body)
            AppResponse.sendOkResponse(res, { lead }, "Lead added successfully")
        } catch (error) {
            next(error)
        }
    }
    updateLeadStatus: RequestHandler = async (req, res, next) => {
       const apiKey = req.query.apiKey as string
        try {
            const leads = await this.leadApiService.updateLeadStatus(apiKey, req.body)
            AppResponse.sendOkResponse(res, { leads }, "Lead status updated successfully")
        } catch (error) {
            next(error)
        }
    }
    updateFtdStatus: RequestHandler = async (req, res, next) => {
        const apiKey = req.query.apiKey as string
        try {
            await this.leadApiService.updateLeadFtdStatus(apiKey, req.body)
            AppResponse.sendOkResponse(res, {  }, "Lead ftd status updated successfully")
        } catch (error) {
            next(error)
        }
    }
}

export default new LeadsAPIController(new LeadsAPIService()) as LeadsAPIController;