"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_logs_1 = __importDefault(require("./core.logs"));
const useURL = (req, res, next) => {
    core_logs_1.default.logDebug(req.method, req.url);
    next();
};
const appMiddlewares = [
    useURL
];
exports.default = appMiddlewares;
