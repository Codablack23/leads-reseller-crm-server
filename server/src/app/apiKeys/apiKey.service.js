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
exports.APIKeyService = void 0;
const core_db_1 = require("../../core/core.db");
const apiKey_type_1 = require("./apiKey.type");
const apiKey_entity_1 = require("../../common/entities/apiKey.entity");
const luxon_1 = require("luxon");
const affiliate_entity_1 = require("../../common/entities/affiliate.entity");
const core_error_1 = require("../../core/core.error");
const brand_entity_1 = require("../../common/entities/brand.entity");
class APIKeyService {
    constructor() {
        this.apiKeyRepository = core_db_1.AppDataSource.getRepository(apiKey_entity_1.APIKeyEntity);
        this.affiliateRepository = core_db_1.AppDataSource.getRepository(affiliate_entity_1.AffiliateEntity);
        this.brandRepository = core_db_1.AppDataSource.getRepository(brand_entity_1.BrandEntity);
    }
    getKeys() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.apiKeyRepository.find({ relations: ["affiliate", "brand"] });
        });
    }
    generatePushApiKey(affiliateId) {
        return __awaiter(this, void 0, void 0, function* () {
            const affiliate = yield this.affiliateRepository.findOne({ where: { id: affiliateId } });
            if (!affiliate) {
                throw new core_error_1.NotFoundError("Affiliate does not exist");
            }
            const expiresAt = luxon_1.DateTime.now().plus({ days: 30 }).toJSDate();
            /**------------------- REVOKES PREVIOUS API KEYS --------------------------- */
            yield this.apiKeyRepository.update({ affiliate }, {
                status: apiKey_type_1.API_KEY_STATUS.REVOKED
            });
            const apiKeyInstance = this.apiKeyRepository.create({
                expiresAt,
                affiliate,
            });
            yield this.apiKeyRepository.save(apiKeyInstance);
            return {
                apiKey: apiKeyInstance.id,
            };
        });
    }
    generatePullApiKey(brandId) {
        return __awaiter(this, void 0, void 0, function* () {
            const brand = yield this.brandRepository.findOne({ where: { id: brandId } });
            if (!brand) {
                throw new core_error_1.NotFoundError("Brand does not exist");
            }
            const expiresAt = luxon_1.DateTime.now().plus({ days: 30 }).toJSDate();
            /**------------------- REVOKES PREVIOUS API KEYS --------------------------- */
            yield this.apiKeyRepository.update({ brand }, {
                status: apiKey_type_1.API_KEY_STATUS.REVOKED
            });
            const apiKeyInstance = this.apiKeyRepository.create({
                expiresAt,
                brand,
            });
            yield this.apiKeyRepository.save(apiKeyInstance);
            return {
                apiKey: apiKeyInstance.id,
            };
        });
    }
    deleteKey(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.apiKeyRepository.delete({ id });
            return { id };
        });
    }
    revokeKey(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.apiKeyRepository.update({ id }, {
                status: apiKey_type_1.API_KEY_STATUS.REVOKED,
            });
            return null;
        });
    }
}
exports.APIKeyService = APIKeyService;
