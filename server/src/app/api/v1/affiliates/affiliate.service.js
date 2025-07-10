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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AffiliateAPIService = void 0;
const affiliate_service_1 = require("../../../affiliate/affiliate.service");
const apiKey_entity_1 = require("../../../../common/entities/apiKey.entity");
const core_db_1 = require("../../../../core/core.db");
class AffiliateAPIService {
    constructor() {
        this.affiliateService = new affiliate_service_1.AffiliateService();
        this.apiKeyRepository = core_db_1.AppDataSource.getRepository(apiKey_entity_1.APIKeyEntity);
    }
    addAffiliate(requestData) {
        return __awaiter(this, void 0, void 0, function* () {
            const affiliate = yield this.affiliateService.addAffliate(requestData);
            return affiliate;
        });
    }
    getAffiliateTraffic(apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { affiliate } = yield this.getAffiliateFromAPIKey(apiKey);
            const traffic = yield this.affiliateService.getAffiliatesTraffic((_a = affiliate === null || affiliate === void 0 ? void 0 : affiliate.id) !== null && _a !== void 0 ? _a : "");
            return traffic;
        });
    }
    addAffiliateTraffic(apiKey, trafficData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { affiliate } = yield this.getAffiliateFromAPIKey(apiKey);
            const traffic = yield this.affiliateService.addAffliateApiTraffic((_a = affiliate === null || affiliate === void 0 ? void 0 : affiliate.id) !== null && _a !== void 0 ? _a : "", trafficData);
            return traffic;
        });
    }
    getAffiliateFromAPIKey(apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiKeyRes = yield this.apiKeyRepository.findOne({
                where: { id: apiKey },
                relations: ["affiliate", "brand"],
            });
            return {
                affiliate: apiKeyRes === null || apiKeyRes === void 0 ? void 0 : apiKeyRes.affiliate,
                brand: apiKeyRes === null || apiKeyRes === void 0 ? void 0 : apiKeyRes.brand,
            };
        });
    }
}
exports.AffiliateAPIService = AffiliateAPIService;
