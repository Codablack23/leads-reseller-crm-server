"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const affiliate_controller_1 = __importDefault(require("./affiliate.controller"));
const middleware_validate_1 = __importDefault(require("../../common/middlewares/middleware.validate"));
const affiliate_validator_1 = require("./affiliate.validator");
const auth_validator_1 = require("../auth/auth.validator");
const affiliateRouter = (0, express_1.Router)();
affiliateRouter.get("/", affiliate_controller_1.default.getAffliates);
affiliateRouter.post("/", (0, middleware_validate_1.default)(affiliate_validator_1.AffiliateValidator.createAffiliateSchema), (0, middleware_validate_1.default)(auth_validator_1.AuthValidator.registerAffiliateSchema), affiliate_controller_1.default.addAffiliate);
affiliateRouter.get("/:id", affiliate_controller_1.default.getAffliate);
affiliateRouter.patch("/:id", (0, middleware_validate_1.default)(affiliate_validator_1.AffiliateValidator.updateAffiliateSchema), affiliate_controller_1.default.updateAffiliate);
affiliateRouter.delete("/:id", affiliate_controller_1.default.deleteAffiliate);
affiliateRouter.get("/all-traffic/:id", affiliate_controller_1.default.getAllAffiliateTraffic);
affiliateRouter.get("/traffic/:id", affiliate_controller_1.default.getAffiliateTrafficDetails);
affiliateRouter.post("/traffic/:id", (0, middleware_validate_1.default)(affiliate_validator_1.AffiliateValidator.createTrafficSchema), affiliate_controller_1.default.addAffiliateTraffic);
affiliateRouter.patch("/traffic/:id", (0, middleware_validate_1.default)(affiliate_validator_1.AffiliateValidator.updateTrafficSchema), affiliate_controller_1.default.updateAffiliateTraffic);
exports.default = {
    routeGroup: "/affiliates",
    routeHandler: affiliateRouter,
};
