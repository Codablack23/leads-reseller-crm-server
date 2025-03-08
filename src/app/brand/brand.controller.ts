import { RequestHandler } from "express"
import { BrandService } from "./brand.service"
import AppResponse from "@common/services/service.response"

class BrandController{
    constructor(private brandService: BrandService){}
    getBrands:RequestHandler = async(req,res,next)=>{
        try {
            const brands = await this.brandService.getBrands()
            AppResponse.sendOkResponse(res,{brands},"brands retrieved successfully")
        } catch (error) {
            next(error)
        }
    }
    getBrand:RequestHandler = async(req,res,next)=>{
        try {
            const brand = await this.brandService.getBrand(req.params.id)
            AppResponse.sendOkResponse(res,{brand},"brands retrieved successfully")
        } catch (error) {
            next(error)
        }
    }
    addBrand:RequestHandler = async(req,res,next)=>{
        try {
            const brand = await this.brandService.addBrand(req.body)
            AppResponse.sendOkResponse(res,{brand},"brand added successfully")
        } catch (error) {
            next(error)
        }
    }
    updateBrand:RequestHandler = async(req,res,next)=>{
        try {
            const brand = await this.brandService.updateBrand(req.params.id,req.body)
            AppResponse.sendOkResponse(res,{brand},"brand updated successfully")
        } catch (error) {
            next(error)
        }
    }
    deleteBrand:RequestHandler = async(req,res,next)=>{
        try {
            const brands = await this.brandService.deleteBrand(req.params.id)
            AppResponse.sendOkResponse(res,{brands},"brands deleted successfully")
        } catch (error) {
            next(error)
        }
    }
}


export default new BrandController(new BrandService()) as BrandController;