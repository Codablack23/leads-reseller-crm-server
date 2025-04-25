import { Router } from "express";
import AffiliateController from "./affiliate.controller";
import useValidation from "@common/middlewares/middleware.validate";
import { AffiliateValidator } from "./affiliate.validator";
import { AuthValidator } from "@app/auth/auth.validator";

const affiliateRouter = Router()
affiliateRouter.get("/",AffiliateController.getAffliates)
affiliateRouter.post("/",
    useValidation(AffiliateValidator.createAffiliateSchema),
    useValidation(AuthValidator.registerAffiliateSchema),
    AffiliateController.addAffiliate
)
affiliateRouter.get("/:id",AffiliateController.getAffliate)
affiliateRouter.patch("/:id",
    useValidation(AffiliateValidator.updateAffiliateSchema),
    AffiliateController.updateAffiliate
)
affiliateRouter.delete("/:id",AffiliateController.deleteAffiliate)

affiliateRouter.get("/all-traffic/:id",
    AffiliateController.getAllAffiliateTraffic
)
affiliateRouter.get("/traffic/:id",
    AffiliateController.getAffiliateTrafficDetails
)
affiliateRouter.post("/traffic/:id",
    useValidation(AffiliateValidator.createTrafficSchema),
    AffiliateController.addAffiliateTraffic
)

affiliateRouter.patch("/traffic/:id",
    useValidation(AffiliateValidator.updateTrafficSchema),
    AffiliateController.updateAffiliateTraffic
)

export default {
    routeGroup: "/affiliates",
    routeHandler: affiliateRouter,
}