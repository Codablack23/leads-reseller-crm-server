"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_secrets_1 = require("../../../core/core.secrets");
const express_1 = require("express");
const middleware_1 = require("./middleware");
const controller_1 = __importDefault(require("./controller"));
const middleware_validate_1 = __importDefault(require("../../../common/middlewares/middleware.validate"));
const validations_1 = require("./validations");
const v1ApiRouter = (0, express_1.Router)();
v1ApiRouter.use(middleware_1.ApiMiddleware.validateApiKey);
v1ApiRouter.get("/", function (req, res) {
    res.json({
        status: "success",
        message: `Welcome to ${core_secrets_1.APP_NAME} API`
    });
});
v1ApiRouter.get("/leads", controller_1.default.getLeads);
v1ApiRouter.post("/leads", (0, middleware_validate_1.default)(validations_1.ApivValidations.addLeadValidation), controller_1.default.addLead);
exports.default = v1ApiRouter;
