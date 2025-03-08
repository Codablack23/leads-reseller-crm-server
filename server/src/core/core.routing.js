"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const affiliate_router_1 = __importDefault(require("../app/affiliate/affiliate.router"));
const api_router_1 = __importDefault(require("../app/api/api.router"));
const apiKey_router_1 = __importDefault(require("../app/apiKeys/apiKey.router"));
const auth_router_1 = __importDefault(require("../app/auth/auth.router"));
const brand_router_1 = __importDefault(require("../app/brand/brand.router"));
const express_1 = require("express");
const appRouter = (0, express_1.Router)();
appRouter.use(auth_router_1.default.routeGroup, auth_router_1.default.routeHandler);
appRouter.use(affiliate_router_1.default.routeGroup, affiliate_router_1.default.routeHandler);
appRouter.use(brand_router_1.default.routeGroup, brand_router_1.default.routeHandler);
appRouter.use(api_router_1.default.routeGroup, api_router_1.default.routeHandler);
appRouter.use(apiKey_router_1.default.routeGroup, apiKey_router_1.default.routeHandler);
exports.default = appRouter;
