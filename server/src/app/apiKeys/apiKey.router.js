"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiKey_controller_1 = __importDefault(require("./apiKey.controller"));
const middleware_validate_1 = __importDefault(require("../../common/middlewares/middleware.validate"));
const apiKey_validator_1 = require("./apiKey.validator");
const apiKeyRouter = (0, express_1.Router)();
apiKeyRouter.get("/", apiKey_controller_1.default.getKeys);
apiKeyRouter.post("/", (0, middleware_validate_1.default)(apiKey_validator_1.APIKeyValidator.createApiKeySchema), apiKey_controller_1.default.generateApiKey);
apiKeyRouter.patch("/:id", (0, middleware_validate_1.default)(apiKey_validator_1.APIKeyValidator.revokeApiKeySchema), apiKey_controller_1.default.revokeKey);
apiKeyRouter.delete("/:id", (0, middleware_validate_1.default)(apiKey_validator_1.APIKeyValidator.revokeApiKeySchema), apiKey_controller_1.default.deleteKey);
exports.default = {
    routeGroup: "/api-keys",
    routeHandler: apiKeyRouter,
};
