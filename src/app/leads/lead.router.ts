import { Router } from "express";
import LeadController from "./lead.controller";
import useValidation from "@common/middlewares/middleware.validate";
// import { LeadValidator } from "./lead.validator";

const leadsRouter = Router()
leadsRouter.get("/",LeadController.getLeads)
leadsRouter.get("/statistics",LeadController.getLeadStats)
leadsRouter.get("/:id",LeadController.getLead)
leadsRouter.patch("/:id",LeadController.updateLead)
leadsRouter.patch("/:id/ftd",LeadController.updateLead)
leadsRouter.delete("/:id",LeadController.deleteLead)

export default {
    routeGroup: "/leads",
    routeHandler: leadsRouter,
}