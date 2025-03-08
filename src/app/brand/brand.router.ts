import { Router } from "express";
import BrandController from "./brand.controller";
import useValidation from "@common/middlewares/middleware.validate";
import { BrandValidator } from "./brand.validator";

const brandRouter = Router()
brandRouter.post("/",
    useValidation(BrandValidator.createBrandSchema),
    BrandController.addBrand)
brandRouter.get("/", BrandController.getBrands)

brandRouter.get("/:id", BrandController.getBrand)
brandRouter.patch("/:id",
    useValidation(BrandValidator.updateBrandSchema),
    BrandController.updateBrand)
brandRouter.delete("/:id", BrandController.deleteBrand)

export default {
    routeGroup: "/brands",
    routeHandler: brandRouter,
}