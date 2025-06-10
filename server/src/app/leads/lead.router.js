"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lead_controller_1 = __importDefault(require("./lead.controller"));
// import { LeadValidator } from "./lead.validator";
const leadsRouter = (0, express_1.Router)();
leadsRouter.get("/", lead_controller_1.default.getLeads);
leadsRouter.get("/:id", lead_controller_1.default.getLead);
leadsRouter.patch("/:id", lead_controller_1.default.updateLead);
leadsRouter.patch("/:id/ftd", lead_controller_1.default.updateLead);
leadsRouter.delete("/:id", lead_controller_1.default.deleteLead);
exports.default = {
    routeGroup: "/leads",
    routeHandler: leadsRouter,
};
