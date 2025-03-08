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
exports.ApiService = void 0;
const apiKey_entity_1 = require("../../../common/entities/apiKey.entity");
const lead_entity_1 = require("../../../common/entities/lead.entity");
const core_db_1 = require("../../../core/core.db");
const brand__entity_1 = require("../../../common/entities/brand..entity");
const luxon_1 = require("luxon");
// import { UnAuthorizedError } from "../../../core/core.error"
class ApiService {
    constructor() {
        this.leadRepository = core_db_1.AppDataSource.getRepository(lead_entity_1.LeadEntity);
        this.apiKeyRepository = core_db_1.AppDataSource.getRepository(apiKey_entity_1.APIKeyEntity);
        this.brandRepository = core_db_1.AppDataSource.getRepository(brand__entity_1.BrandEntity);
    }
    getUserLeads(apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const { affiliate, brand } = yield this.getAffiliateFromAPIKey(apiKey);
            if (affiliate) {
                return yield this.leadRepository.find({
                    where: {
                        affiliate: {
                            id: affiliate.id
                        }
                    },
                    relations: ["affiliate"]
                });
            }
            return yield this.leadRepository.find({
                where: {
                    brand: {
                        id: brand === null || brand === void 0 ? void 0 : brand.id
                    }
                },
                relations: ["brand"]
            });
        });
    }
    addLead(apiKey, leadData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { affiliate } = yield this.getAffiliateFromAPIKey(apiKey);
            const allBrands = yield this.brandRepository.find({
                where: {
                    country: affiliate === null || affiliate === void 0 ? void 0 : affiliate.country
                }
            });
            const newLeadRequest = this.leadRepository.create(Object.assign(Object.assign({}, leadData), { affiliate, country: affiliate === null || affiliate === void 0 ? void 0 : affiliate.country, brand: allBrands[0] }));
            const newLead = yield this.leadRepository.save(newLeadRequest);
            return newLead;
        });
    }
    getAffiliateFromAPIKey(apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiKeyRes = yield this.apiKeyRepository.findOne({
                where: {
                    id: apiKey
                },
                relations: ["affiliate"]
            });
            const affiliate = apiKeyRes === null || apiKeyRes === void 0 ? void 0 : apiKeyRes.affiliate;
            const brand = apiKeyRes === null || apiKeyRes === void 0 ? void 0 : apiKeyRes.brand;
            return { affiliate, brand };
        });
    }
    getAffiliateTrafficDetails(affiliate) {
        const currentDate = luxon_1.DateTime.now();
        const affiliateClosingTime = luxon_1.DateTime.fromFormat(affiliate === null || affiliate === void 0 ? void 0 : affiliate.closingTime, "hh:mm");
        const affiliateOpeningTime = luxon_1.DateTime.fromFormat(affiliate === null || affiliate === void 0 ? void 0 : affiliate.openingTime, "hh:mm");
        const openingDiff = currentDate.diff(affiliateOpeningTime).milliseconds / (1000 * 60);
        const closingDiff = currentDate.diff(affiliateClosingTime).milliseconds / (1000 * 60);
        console.log({ openingDiff, closingDiff });
        return {};
    }
}
exports.ApiService = ApiService;
