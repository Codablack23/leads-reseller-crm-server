import { RequestHandler } from "express";
import { ApiService } from "./service";
import AppResponse from "@common/services/service.response";

class APIController{
    constructor(private apiService: ApiService) {}
    getLeads:RequestHandler = async(req,res,next)=>{
        try {
            const apiKey = req.query.apiKey
            const leads = await this.apiService.getUserLeads(apiKey as string)
            AppResponse.sendOkResponse(res,{leads},"Leads fetched successfully")
        } catch (error) {
            next(error)
        }
    }
    addLead:RequestHandler = async(req,res,next)=>{
        const apiKey = req.query.apiKey as string
        try {
            const lead = await this.apiService.addLead(apiKey,req.body)
            AppResponse.sendOkResponse(res, {lead},"Lead added successfull")
        } catch (error) {
            next(error)
        }
    }
    getLeadStatus:RequestHandler = async(req,res)=>{

    }
}

export default new APIController(new ApiService()) as APIController;