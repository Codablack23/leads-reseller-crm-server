import { Router } from "express";
import StatusMapController from "./status.controller";
import useValidation from "@common/middlewares/middleware.validate";
import { StatusMapValidator } from "./status.validator";
// import { LeadValidator } from "./lead.validator";

const statusMapRouter = Router()

/***-------------------------- STATUS MAP ENDPOINTS -------------------------------------- */
statusMapRouter.get("/unmapped/",StatusMapController.getUnmappedStatus)
statusMapRouter.get("/map/",StatusMapController.getStatusMap)
statusMapRouter.get("map/:id",StatusMapController.getStatusMapById)
statusMapRouter.post("/map/",
    useValidation(StatusMapValidator.addStatusMapValidator),
    StatusMapController.addStatusMap
)
statusMapRouter.patch("/map/:id",
    StatusMapController.updateStatusMap
)
statusMapRouter.delete("/map/:id",StatusMapController.deleteStatusMap)

/***--------------------------STATUS LIST ENDPOINTS-------------------------------------- */
statusMapRouter.get("/list/",StatusMapController.getStatusList)
statusMapRouter.get("/list/:id",StatusMapController.getStatus)
statusMapRouter.post("/list/",
    useValidation(StatusMapValidator.addStatusValidator),
    StatusMapController.addStatus
)
statusMapRouter.patch("/list/:id",
    StatusMapController.updateStatus
)
statusMapRouter.delete("/list/:id",StatusMapController.deleteStatus)


export default {
    routeGroup: "/status-settings",
    routeHandler: statusMapRouter,
}