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
exports.LeadsAPIService = void 0;
const apiKey_entity_1 = require("../../../../common/entities/apiKey.entity");
const core_db_1 = require("../../../../core/core.db");
const traffic_entity_1 = require("../../../../common/entities/traffic.entity");
const lead_entity_1 = require("../../../../common/entities/lead.entity");
// import { UnAuthorizedError } from "../../../../core/core.error"
class LeadsAPIService {
    constructor() {
        this.trafficRepository = core_db_1.AppDataSource.getRepository(traffic_entity_1.TrafficEntity);
        this.leadRepository = core_db_1.AppDataSource.getRepository(lead_entity_1.LeadEntity);
        this.apiKeyRepository = core_db_1.AppDataSource.getRepository(apiKey_entity_1.APIKeyEntity);
    }
    getUserLeads(apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const { affiliate, brand } = yield this.getAffiliateFromAPIKey(apiKey);
            if (affiliate) {
                const leads = this.leadRepository.find({
                    where: { traffic: { affiliate } }
                });
                return leads;
            }
            const leads = this.leadRepository.find({
                where: { traffic: { brand } }
            });
            return leads;
        });
    }
    addLead(apiKey, leadData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { affiliate } = yield this.getAffiliateFromAPIKey(apiKey);
            const traffic = yield this.trafficRepository.find({
                where: {
                    country: leadData.country
                }
            });
            return {};
        });
    }
    getAffiliateFromAPIKey(apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiKeyRes = yield this.apiKeyRepository.findOne({
                where: {
                    id: apiKey
                },
                relations: ["affiliate", "brand"]
            });
            const affiliate = apiKeyRes === null || apiKeyRes === void 0 ? void 0 : apiKeyRes.affiliate;
            const brand = apiKeyRes === null || apiKeyRes === void 0 ? void 0 : apiKeyRes.brand;
            return { affiliate, brand };
        });
    }
}
exports.LeadsAPIService = LeadsAPIService;
