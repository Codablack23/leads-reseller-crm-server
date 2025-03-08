import { APP_NAME } from "@core/core.secrets";
import { Router } from "express";
import { ApiMiddleware } from "./middleware";
import ApiController from "./controller";
import useValidation from "@common/middlewares/middleware.validate";
import { ApivValidations } from "./validations";


const v1ApiRouter = Router()
v1ApiRouter.use(ApiMiddleware.validateApiKey)
v1ApiRouter.get("/",function(req, res){
    res.json({
        status:"success",
        message:`Welcome to ${APP_NAME} API`
    })
})
v1ApiRouter.get("/leads",ApiController.getLeads)
v1ApiRouter.post("/leads",useValidation(ApivValidations.addLeadValidation),ApiController.addLead)


export default v1ApiRouter