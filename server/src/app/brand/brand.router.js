"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brand_controller_1 = __importDefault(require("./brand.controller"));
const middleware_validate_1 = __importDefault(require("../../common/middlewares/middleware.validate"));
const brand_validator_1 = require("./brand.validator");
const brandRouter = (0, express_1.Router)();
brandRouter.post("/", (0, middleware_validate_1.default)(brand_validator_1.BrandValidator.createBrandSchema), brand_controller_1.default.addBrand);
brandRouter.get("/", brand_controller_1.default.getBrands);
brandRouter.get("/:id", brand_controller_1.default.getBrand);
brandRouter.patch("/:id", (0, middleware_validate_1.default)(brand_validator_1.BrandValidator.updateBrandSchema), brand_controller_1.default.updateBrand);
brandRouter.delete("/:id", brand_controller_1.default.deleteBrand);
exports.default = {
    routeGroup: "/brands",
    routeHandler: brandRouter,
};
