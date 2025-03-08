import { Router } from "express";
import BrandController from "./brand.controller";
import useValidation from "@common/middlewares/middleware.validate";
import { BrandValidator } from "./brand.validator";

const brandRouter = Router()
brandRouter.get("/",)
brandRouter.get("/profile",)
brandRouter.post("/login",)
brandRouter.post("/register")
brandRouter.post("/logout")

export default {
    routeGroup: "/brands",
    routeHandler: brandRouter,
}