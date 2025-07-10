"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_secrets_1 = require("../../../../core/core.secrets");
const express_1 = require("express");
const middleware_1 = require("../middleware");
const middleware_validate_1 = __importDefault(require("../../../../common/middlewares/middleware.validate"));
const validations_1 = require("../validations");
const leads_controller_1 = __importDefault(require("../leads/leads.controller"));
const affiliate_controller_1 = __importDefault(require("../affiliates/affiliate.controller"));
const brand_controller_1 = __importDefault(require("../brands/brand.controller"));
const affiliate_validator_1 = require("../../../affiliate/affiliate.validator");
const auth_validator_1 = require("../../../auth/auth.validator");
const brand_validator_1 = require("../../../brand/brand.validator");
const v1ApiRouter = (0, express_1.Router)();
v1ApiRouter.get("/", function (req, res) {
    res.json({ status: "success", message: `Welcome to ${core_secrets_1.APP_NAME} API` });
});
// AFFILIATES API ENDPOINTS
v1ApiRouter.post("/affiliates", (0, middleware_validate_1.default)(affiliate_validator_1.AffiliateValidator.addAffiliateSchema), (0, middleware_validate_1.default)(auth_validator_1.AuthValidator.registerAffiliateSchema), affiliate_controller_1.default.addAffiliate); // AFFILIATES API ENDPOINTS
v1ApiRouter.get("/affiliates/traffic", middleware_1.ApiMiddleware.validateApiKey, affiliate_controller_1.default.getAffiliateTraffic),
    v1ApiRouter.post("/affiliates/traffic", middleware_1.ApiMiddleware.validateApiKey, (0, middleware_validate_1.default)(affiliate_validator_1.AffiliateValidator.addTrafficSchema), affiliate_controller_1.default.addAffiliateTraffic);
v1ApiRouter.post("/brands", (0, middleware_validate_1.default)(brand_validator_1.BrandValidator.createBrandSchema), (0, middleware_validate_1.default)(auth_validator_1.AuthValidator.registerBrandSchema), brand_controller_1.default.addBrand);
v1ApiRouter.get("/leads", middleware_1.ApiMiddleware.validateApiKey, leads_controller_1.default.getLeads);
v1ApiRouter.post("/leads", middleware_1.ApiMiddleware.validateApiKey, (0, middleware_validate_1.default)(validations_1.ApivValidations.addLeadValidation), leads_controller_1.default.addLead),
    v1ApiRouter.post("/leads/status", middleware_1.ApiMiddleware.validateApiKey, (0, middleware_validate_1.default)(validations_1.ApivValidations.updateLeadStatusValidation), leads_controller_1.default.updateLeadStatus);
v1ApiRouter.patch("/leads/ftd", middleware_1.ApiMiddleware.validateApiKey, (0, middleware_validate_1.default)(validations_1.ApivValidations.updateLeadFtdStatusValidation), leads_controller_1.default.updateFtdStatus);
exports.default = v1ApiRouter;
