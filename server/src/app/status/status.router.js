"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const status_controller_1 = __importDefault(require("./status.controller"));
const middleware_validate_1 = __importDefault(require("../../common/middlewares/middleware.validate"));
const status_validator_1 = require("./status.validator");
// import { LeadValidator } from "./lead.validator";
const statusMapRouter = (0, express_1.Router)();
/***-------------------------- STATUS MAP ENDPOINTS -------------------------------------- */
statusMapRouter.get("/unmapped/", status_controller_1.default.getUnmappedStatus);
statusMapRouter.get("/map/", status_controller_1.default.getStatusMap);
statusMapRouter.get("map/:id", status_controller_1.default.getStatusMapById);
statusMapRouter.post("/map/", (0, middleware_validate_1.default)(status_validator_1.StatusMapValidator.addStatusMapValidator), status_controller_1.default.addStatusMap);
statusMapRouter.patch("/map/:id", status_controller_1.default.updateStatusMap);
statusMapRouter.delete("/map/:id", status_controller_1.default.deleteStatusMap);
/***--------------------------STATUS LIST ENDPOINTS-------------------------------------- */
statusMapRouter.get("/list/", status_controller_1.default.getStatusList);
statusMapRouter.get("/list/:id", status_controller_1.default.getStatus);
statusMapRouter.post("/list/", (0, middleware_validate_1.default)(status_validator_1.StatusMapValidator.addStatusValidator), status_controller_1.default.addStatus);
statusMapRouter.patch("/list/:id", status_controller_1.default.updateStatus);
statusMapRouter.delete("/list/:id", status_controller_1.default.deleteStatus);
exports.default = {
    routeGroup: "/status-settings",
    routeHandler: statusMapRouter,
};
