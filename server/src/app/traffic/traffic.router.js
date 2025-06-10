"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const traffic_controller_1 = __importDefault(require("./traffic.controller"));
const middleware_validate_1 = __importDefault(require("../../common/middlewares/middleware.validate"));
const traffic_validator_1 = require("./traffic.validator");
const trafficRouter = (0, express_1.Router)();
trafficRouter.get("/", traffic_controller_1.default.getAllTraffic);
trafficRouter.get("/:id", traffic_controller_1.default.getTrafficDetails);
trafficRouter.patch("/:id", (0, middleware_validate_1.default)(traffic_validator_1.TrafficValidator.updateTrafficSchema), traffic_controller_1.default.updateTraffic);
exports.default = {
    routeGroup: "/traffic",
    routeHandler: trafficRouter,
};
