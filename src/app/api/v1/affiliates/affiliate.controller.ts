import { RequestHandler } from "express";
import {AffiliateAPIService} from "./affiliate.service";
import AppResponse from "@common/services/service.response";


class AffiliateAPIController{
    constructor(private affiliateAPIService: AffiliateAPIService) {}

    addAffiliate:RequestHandler = async(req,res,next)=>{
        try {
            const affiliate = await this.affiliateAPIService.addAffiliate(req.body)
            AppResponse.sendOkResponse(res, {affiliate},"Affiliate added successfull")
        } catch (error) {
            next(error)
        }
    }
    getLeadStatus:RequestHandler = async(req,res)=>{

    }
}

export default new AffiliateAPIController(new AffiliateAPIService()) as AffiliateAPIController;