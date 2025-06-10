import { RequestHandler } from "express"
import { TrafficService } from './traffic.service';
import AppResponse from "@common/services/service.response";

class TrafficController{

    constructor(private trafficService:TrafficService){}

    getAllTraffic:RequestHandler = async(req,res,next)=>{
        try {
            const all_traffic = await this.trafficService.getTraffic(req.params.id)
            AppResponse.sendOkResponse(res, {all_traffic},"affiliate added successfully")
        } catch (error) {
            next(error)
        }
    }
    getTrafficDetails:RequestHandler = async(req,res,next)=>{
        try {
            const traffic = await this.trafficService.getTrafficDetails(req.params.id)
            AppResponse.sendOkResponse(res, {traffic},"affiliate added successfully")
        } catch (error) {
            next(error)
        }
    }
    updateTraffic:RequestHandler = async(req,res,next)=>{
        const {id} = req.params
        const updateData = req.body
        try {
            const traffic = await this.trafficService.updateAffiliateTraffic(id,updateData)
            AppResponse.sendOkResponse(res,{traffic},`traffic updated successfully`)
        } catch (error) {
            next(error)
        }
    }

}


export default new TrafficController(new TrafficService()) as TrafficController;