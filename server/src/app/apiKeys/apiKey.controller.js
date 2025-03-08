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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiKey_service_1 = require("./apiKey.service");
const service_response_1 = __importDefault(require("../../common/services/service.response"));
class APIKeyController {
    constructor(apiKeyService) {
        this.apiKeyService = apiKeyService;
        this.getKeys = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const apiKeys = yield this.apiKeyService.getKeys();
                service_response_1.default.sendOkResponse(res, { apiKeys }, "affiliates retrieved successfully");
            }
            catch (error) {
                next(error);
            }
        });
        this.generateApiKey = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { brandId, affiliateId } = req.body;
                if (affiliateId) {
                    const apiKeyRes = yield this.apiKeyService.generatePushApiKey(affiliateId);
                    service_response_1.default.sendOkResponse(res, apiKeyRes, "api key generated successfully");
                    return;
                }
                const apiKeyRes = yield this.apiKeyService.generatePushApiKey(brandId);
                service_response_1.default.sendOkResponse(res, apiKeyRes, "api key generated successfully");
            }
            catch (error) {
                next(error);
            }
        });
        this.revokeKey = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.apiKeyService.revokeKey(id);
                service_response_1.default.sendOkResponse(res, null, `api key revoked successfully`);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteKey = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.apiKeyService.deleteKey(id);
                service_response_1.default.sendOkResponse(res, { id }, `api key deleted successfully`);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new APIKeyController(new apiKey_service_1.APIKeyService());
