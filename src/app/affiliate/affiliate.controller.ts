import { RequestHandler } from "express"
import { AffiliateService } from './affiliate.service';
import AppResponse from "@common/services/service.response";

class AffiliateController{

    constructor(private affiliateService:AffiliateService){}
    getAffliates:RequestHandler = async(req,res,next)=>{
        try {
            const affiliates = await this.affiliateService.getAffiliates()
            AppResponse.sendOkResponse(res,{affiliates},"affiliates retrieved successfully")
        } catch (error) {
            next(error)
        }
    }

    getAffliate:RequestHandler = async(req,res,next)=>{
        const {id} = req.params
        try {
            const affiliate = await this.affiliateService.getAffiliate(id)
            AppResponse.sendOkResponse(res,{affiliate},"affiliate retrieved successfully")
        } catch (error) {
            next(error)
        }
    }

    addAffiliate:RequestHandler = async(req,res,next)=>{
        try {
            const affiliate = await this.affiliateService.addAffliate(req.body)
            AppResponse.sendOkResponse(res, {affiliate},"affiliate added successfully")
        } catch (error) {
            next(error)
        }
    }
    addAffiliateTraffic:RequestHandler = async(req,res,next)=>{
        try {
            const traffic = await this.affiliateService.addAffliateTraffic(req.params.id,req.body)
            AppResponse.sendOkResponse(res, {traffic},"affiliate added successfully")
        } catch (error) {
            next(error)
        }
    }
    getAllAffiliateTraffic:RequestHandler = async(req,res,next)=>{
        try {
            const traffic = await this.affiliateService.getAffiliatesTraffic(req.params.id)
            AppResponse.sendOkResponse(res, {traffic},"affiliate added successfully")
        } catch (error) {
            next(error)
        }
    }
    getAffiliateTrafficDetails:RequestHandler = async(req,res,next)=>{
        try {
            const traffic = await this.affiliateService.getAffiliateTrafficDetails(req.params.id)
            AppResponse.sendOkResponse(res, {traffic},"affiliate added successfully")
        } catch (error) {
            next(error)
        }
    }
    updateAffiliate:RequestHandler = async(req,res,next)=>{
        const {id} = req.params
        const updateData = req.body
        try {
            const affiliate = await this.affiliateService.updateAffiliate(id,updateData)
            AppResponse.sendOkResponse(res,{affiliate},`affiliate updated successfully`)
        } catch (error) {
            next(error)
        }
    }

    updateAffiliateTraffic:RequestHandler = async(req,res,next)=>{
        const {id} = req.params
        const updateData = req.body
        try {
            const affiliate = await this.affiliateService.updateAffiliateTraffic(id,updateData)
            AppResponse.sendOkResponse(res,{affiliate},`affiliate updated successfully`)
        } catch (error) {
            next(error)
        }
    }

    deleteAffiliate:RequestHandler = async(req,res,next)=>{
        const {id} = req.params
        try {
            const affiliate = await this.affiliateService.deleteAffiliate(id)
            AppResponse.sendOkResponse(res,{affiliate},`affiliate deleted successfully`)
        } catch (error) {
            next(error)
        }
    }

    deleteAffiliateTraffic:RequestHandler = async(req,res,next)=>{
        const {id} = req.params
        try {
            const affiliate = await this.affiliateService.deleteAffiliateTraffic(id)
            AppResponse.sendOkResponse(res,{affiliate},`affiliate deleted successfully`)
        } catch (error) {
            next(error)
        }
    }
}


export default new AffiliateController(new AffiliateService()) as AffiliateController;