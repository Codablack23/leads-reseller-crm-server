"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const middleware_validate_1 = __importDefault(require("../../common/middlewares/middleware.validate"));
const auth_validator_1 = require("./auth.validator");
const authRouter = (0, express_1.Router)();
authRouter.get("/", auth_controller_1.default.getAuthStatus);
authRouter.get("/profile", auth_controller_1.default.getAuthStatus);
authRouter.post("/login", (0, middleware_validate_1.default)(auth_validator_1.AuthValidator.loginSchema), auth_controller_1.default.login);
authRouter.post("/register", (0, middleware_validate_1.default)(auth_validator_1.AuthValidator.registerSchema), auth_controller_1.default.register);
authRouter.post("/logout", auth_controller_1.default.logOut);
exports.default = {
    routeGroup: "/auth",
    routeHandler: authRouter,
};
