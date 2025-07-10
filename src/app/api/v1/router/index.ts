import { APP_NAME } from "@core/core.secrets";
import { Router } from "express";
import { ApiMiddleware } from "../middleware";
import useValidation from "@common/middlewares/middleware.validate";
import { ApivValidations } from "../validations";
import LeadsAPIController from "../leads/leads.controller";
import AffiliateAPIController from "../affiliates/affiliate.controller";
import BrandAPIController from "../brands/brand.controller";
import { AffiliateValidator } from "@app/affiliate/affiliate.validator";
import { AuthValidator } from "@app/auth/auth.validator";
import { BrandValidator } from "@app/brand/brand.validator";


const v1ApiRouter = Router()

v1ApiRouter.get("/",function(req, res){
    res.json({status:"success",message:`Welcome to ${APP_NAME} API`})
})
// AFFILIATES API ENDPOINTS
v1ApiRouter.post("/affiliates",
    useValidation(AffiliateValidator.addAffiliateSchema),
    useValidation(AuthValidator.registerAffiliateSchema),
    AffiliateAPIController.addAffiliate
)// AFFILIATES API ENDPOINTS
v1ApiRouter.get("/affiliates/traffic",
    ApiMiddleware.validateApiKey,
    AffiliateAPIController.getAffiliateTraffic
),
v1ApiRouter.post("/affiliates/traffic",
    ApiMiddleware.validateApiKey,
    useValidation(AffiliateValidator.addTrafficSchema),
    AffiliateAPIController.addAffiliateTraffic
)
v1ApiRouter.post("/brands",
    useValidation(BrandValidator.createBrandSchema),
    useValidation(AuthValidator.registerBrandSchema),
    BrandAPIController.addBrand
)

v1ApiRouter.get("/leads",ApiMiddleware.validateApiKey,LeadsAPIController.getLeads)

v1ApiRouter.post("/leads",
    ApiMiddleware.validateApiKey,
    useValidation(ApivValidations.addLeadValidation),
    LeadsAPIController.addLead
),

v1ApiRouter.post("/leads/status",
    ApiMiddleware.validateApiKey,
    useValidation(ApivValidations.updateLeadStatusValidation),
    LeadsAPIController.updateLeadStatus
)

v1ApiRouter.patch("/leads/ftd",
    ApiMiddleware.validateApiKey,
    useValidation(ApivValidations.updateLeadFtdStatusValidation),
    LeadsAPIController.updateFtdStatus
)



export default v1ApiRouter