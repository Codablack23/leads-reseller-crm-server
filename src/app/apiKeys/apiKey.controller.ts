import { RequestHandler } from "express"
import { APIKeyService } from './apiKey.service';
import AppResponse from "@common/services/service.response";

class APIKeyController{

    constructor(private apiKeyService:APIKeyService){}

    getKeys:RequestHandler = async(req,res,next)=>{
        try {
            const apiKeys = await this.apiKeyService.getKeys()
            AppResponse.sendOkResponse(res,{apiKeys},"affiliates retrieved successfully")
        } catch (error) {
            next(error)
        }
    }
    generateApiKey:RequestHandler = async(req,res,next)=>{
        try {
            const {brandId,affiliateId} = req.body
            if(affiliateId){
                const apiKeyRes = await this.apiKeyService.generatePushApiKey(affiliateId)
                AppResponse.sendOkResponse(res, apiKeyRes,"api key generated successfully")
                return;
            }
            const apiKeyRes = await this.apiKeyService.generatePushApiKey(brandId)
            AppResponse.sendOkResponse(res, apiKeyRes,"api key generated successfully")

        } catch (error) {
            next(error)
        }
    }
    revokeKey:RequestHandler = async(req,res,next)=>{
        const {id} = req.params
        try {
            await this.apiKeyService.revokeKey(id)
            AppResponse.sendOkResponse(res,null,`api key revoked successfully`)
        } catch (error) {
            next(error)
        }
    }
    deleteKey:RequestHandler = async(req,res,next)=>{
        const {id} = req.params
        try {
            await this.apiKeyService.deleteKey(id)
            AppResponse.sendOkResponse(res,{id},`api key deleted successfully`)
        } catch (error) {
            next(error)
        }
    }
}


export default new APIKeyController(new APIKeyService()) as APIKeyController;