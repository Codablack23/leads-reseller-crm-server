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
exports.APIKeyValidator = void 0;
const affiliate_entity_1 = require("../../common/entities/affiliate.entity");
const apiKey_entity_1 = require("../../common/entities/apiKey.entity");
const brand__entity_1 = require("../../common/entities/brand..entity");
const core_db_1 = require("../../core/core.db");
const express_validator_1 = require("express-validator");
const affiliateRepository = core_db_1.AppDataSource.getRepository(affiliate_entity_1.AffiliateEntity);
const brandRepository = core_db_1.AppDataSource.getRepository(brand__entity_1.BrandEntity);
const apiKeyRepository = core_db_1.AppDataSource.getRepository(apiKey_entity_1.APIKeyEntity);
class APIKeyValidator {
}
exports.APIKeyValidator = APIKeyValidator;
_a = APIKeyValidator;
APIKeyValidator.createApiKeySchema = [
    (0, express_validator_1.body)("brandId").if((0, express_validator_1.body)("affiliateId").isEmpty())
        .custom((brandId) => __awaiter(void 0, void 0, void 0, function* () {
        const existingBrand = yield brandRepository.findOne({
            where: {
                id: brandId
            }
        });
        if (!existingBrand) {
            throw new Error("Brand does not exist");
        }
    })),
    (0, express_validator_1.body)("affiliateId").if((0, express_validator_1.body)("brandId").isEmpty())
        .custom((affiliateId) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(affiliateId);
        const existingAffiliates = yield affiliateRepository.findOne({
            where: {
                id: affiliateId
            }
        });
        if (!existingAffiliates) {
            throw new Error("Affiliate does not exist");
        }
    }))
];
APIKeyValidator.revokeApiKeySchema = [
    (0, express_validator_1.param)("id").custom((id) => __awaiter(void 0, void 0, void 0, function* () {
        const apiKeyExists = yield apiKeyRepository.findOne({ where: { id } });
        if (!apiKeyExists) {
            throw new Error("Api key does not exist");
        }
    })),
];
