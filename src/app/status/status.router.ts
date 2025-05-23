import { Router } from "express";
import StatuMapController from "./status.controller";
import useValidation from "@common/middlewares/middleware.validate";
import { StatusMapValidator } from "./status.validator";
// import { LeadValidator } from "./lead.validator";

const statusMapRouter = Router()
statusMapRouter.get("/",StatuMapController.getStatusMap)
statusMapRouter.get("/:id",StatuMapController.getStatusMapById)
statusMapRouter.post("/",
    useValidation(StatusMapValidator.addStatusValidator),
    StatuMapController.addStatusMap
)
statusMapRouter.patch("/:id",
    StatuMapController.updateStatusMap
)
statusMapRouter.delete("/:id",StatuMapController.deleteStatusMap)


export default {
    routeGroup: "/status-map",
    routeHandler: statusMapRouter,
}