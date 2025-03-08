"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router_1 = __importDefault(require("./v1/router"));
const cors_1 = __importDefault(require("cors"));
const apiRouter = (0, express_1.Router)();
apiRouter.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
}));
apiRouter.use("/v1", router_1.default);
exports.default = {
    routeGroup: "/api",
    routeHandler: apiRouter,
};
