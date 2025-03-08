import { Router } from "express";
import AffiliateController from "./affiliate.controller";
import useValidation from "@common/middlewares/middleware.validate";
import { AffiliateValidator } from "./affiliate.validator";

const affiliateRouter = Router()
affiliateRouter.get("/",AffiliateController.getAffliates)
affiliateRouter.post("/",
    useValidation(AffiliateValidator.createAffiliateSchema),
    AffiliateController.addAffiliate
)
affiliateRouter.get("/:id",AffiliateController.getAffliate)
affiliateRouter.patch("/:id",
    useValidation(AffiliateValidator.updateAffiliateSchema),
    AffiliateController.updateAffiliate
)
affiliateRouter.delete("/:id",AffiliateController.deleteAffiliate)


export default {
    routeGroup: "/affiliates",
    routeHandler: affiliateRouter,
}