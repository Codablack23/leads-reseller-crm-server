import { Router } from "express";
import TrafficController from "./traffic.controller";
import useValidation from "@common/middlewares/middleware.validate";
import { TrafficValidator } from "./traffic.validator";


const trafficRouter = Router()
trafficRouter.get("/",TrafficController.getAllTraffic)

trafficRouter.get("/:id",TrafficController.getTrafficDetails)
trafficRouter.patch("/:id",
    useValidation(TrafficValidator.updateTrafficSchema),
    TrafficController.updateTraffic
)



export default {
    routeGroup: "/traffic",
    routeHandler: trafficRouter,
}