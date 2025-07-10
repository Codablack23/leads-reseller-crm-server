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
    getAffiliateTraffic:RequestHandler = async(req,res,next)=>{
        try {
            const all_traffic = await this.affiliateAPIService.getAffiliateTraffic((req as any).apiKey)
            AppResponse.sendOkResponse(res, {all_traffic},"Affiliate Traffic retrieved successfully")
        } catch (error) {
            next(error)
        }
    }
    addAffiliateTraffic:RequestHandler = async(req,res,next)=>{
        try {
            const traffic = await this.affiliateAPIService.addAffiliateTraffic((req as any).apiKey,req.body)
            AppResponse.sendOkResponse(res, {traffic},"Affiliate Traffic added successfully")
        } catch (error) {
            next(error)
        }
    }
    getLeadStatus:RequestHandler = async(req,res)=>{

    }
}

export default new AffiliateAPIController(new AffiliateAPIService()) as AffiliateAPIController;