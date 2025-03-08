"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiMiddleware = void 0;
const apiKey_entity_1 = require("../../../common/entities/apiKey.entity");
const core_db_1 = require("../../../core/core.db");
const core_error_1 = require("../../../core/core.error");
const luxon_1 = require("luxon");
const apiKeyRepository = core_db_1.AppDataSource.getRepository(apiKey_entity_1.APIKeyEntity);
class ApiMiddleware {
}
exports.ApiMiddleware = ApiMiddleware;
_a = ApiMiddleware;
ApiMiddleware.validateApiKey = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiKey = req.query.apiKey;
        if (!apiKey)
            throw new core_error_1.BadRequest("Please provide your API Key");
        const existingApiKey = yield apiKeyRepository.findOne({ where: { id: apiKey } });
        if (!existingApiKey)
            throw new core_error_1.BadRequest("Invalid API Key");
        const expiresAt = existingApiKey.expiresAt;
        const timeDifference = luxon_1.DateTime.fromJSDate(expiresAt).diffNow();
        if (timeDifference.milliseconds < 1)
            throw new core_error_1.BadRequest("Invalid API Key");
        req.apiKey = apiKey;
        next();
    }
    catch (error) {
        next(error);
    }
});
