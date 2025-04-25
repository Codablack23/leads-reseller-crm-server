import { RequestHandler } from "express";
import {BrandAPIService} from "./brand.service";
import AppResponse from "@common/services/service.response";


class BrandAPIController{
    constructor(private brandApiService: BrandAPIService) {}

    addBrand:RequestHandler = async(req,res,next)=>{
        try {
            const brand = await this.brandApiService.addBrand(req.body)
            AppResponse.sendOkResponse(res, {brand},"Brand added successfully")
        } catch (error) {
            next(error)
        }
    }
    getLeadStatus:RequestHandler = async(req,res)=>{

    }
}

export default new BrandAPIController(new BrandAPIService()) as BrandAPIController;