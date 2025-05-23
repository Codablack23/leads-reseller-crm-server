import { RequestHandler } from "express";
import {LeadsAPIService} from "./leads.service";
import AppResponse from "@common/services/service.response";

class LeadsAPIController{
    constructor(private leadApiService: LeadsAPIService) {}
    getLeads:RequestHandler = async(req,res,next)=>{
        try {
            const apiKey = req.query.apiKey
            const leads = await this.leadApiService.getUserLeads(apiKey as string)
            AppResponse.sendOkResponse(res,{leads},"Leads fetched successfully")
        } catch (error) {
            next(error)
        }
    }
    addLead:RequestHandler = async(req,res,next)=>{
        const apiKey = req.query.apiKey as string
        try {
            const lead = await this.leadApiService.addLead(apiKey,req.body)
            AppResponse.sendOkResponse(res, {lead},"Lead added successfully")
        } catch (error) {
            next(error)
        }
    }
    getLeadStatus:RequestHandler = async(req,res)=>{

    }
}

export default new LeadsAPIController(new LeadsAPIService()) as LeadsAPIController;