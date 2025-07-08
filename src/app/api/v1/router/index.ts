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
v1ApiRouter.get("/leads",ApiMiddleware.validateApiKey,LeadsAPIController.getLeads)

v1ApiRouter.post("/leads",
    ApiMiddleware.validateApiKey,
    useValidation(ApivValidations.addLeadValidation),
    LeadsAPIController.addLead
)

// AFFILIATES API ENDPOINTS
v1ApiRouter.post("/affiliates",
    useValidation(AffiliateValidator.addAffiliateSchema),
    useValidation(AuthValidator.registerAffiliateSchema),
    AffiliateAPIController.addAffiliate
)
v1ApiRouter.post("/brands",
    useValidation(BrandValidator.createBrandSchema),
    useValidation(AuthValidator.registerBrandSchema),
    BrandAPIController.addBrand
)


export default v1ApiRouter