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
exports.AffiliateService = void 0;
const core_db_1 = require("../../core/core.db");
const affiliate_entity_1 = require("../../common/entities/affiliate.entity");
const core_error_1 = require("../../core/core.error");
const auth_service_1 = require("../auth/auth.service");
const core_secrets_1 = require("../../core/core.secrets");
const apiKey_service_1 = require("../apiKeys/apiKey.service");
const traffic_entity_1 = require("../../common/entities/traffic.entity");
class AffiliateService {
    constructor() {
        this.affiliateRepository = core_db_1.AppDataSource.getRepository(affiliate_entity_1.AffiliateEntity);
        this.trafficRepository = core_db_1.AppDataSource.getRepository(traffic_entity_1.TrafficEntity);
        this.authService = new auth_service_1.AuthService();
        this.apiKeyService = new apiKey_service_1.APIKeyService();
    }
    getAffiliates() {
        return __awaiter(this, void 0, void 0, function* () {
            const affiliates = yield this.affiliateRepository.find({
                relations: {
                    traffic: true
                }
            });
            return affiliates;
        });
    }
    getAffiliate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const affiliate = yield this.affiliateRepository.findOne({ where: { id } });
            if (!affiliate)
                throw new core_error_1.NotFoundError("Affiliate does not exist");
            return affiliate;
        });
    }
    getAffiliatesTraffic(affiliateId) {
        return __awaiter(this, void 0, void 0, function* () {
            const affiliates = yield this.trafficRepository.find({
                where: {
                    affiliate: {
                        id: affiliateId
                    }
                },
                relations: {
                    affiliate: true
                }
            });
            return affiliates;
        });
    }
    getAffiliateTrafficDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const traffic = yield this.trafficRepository.findOne({ where: { id } });
            if (!traffic)
                throw new core_error_1.NotFoundError("Traffic does not exist");
            return traffic;
        });
    }
    generateCode(length = 6) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }
    addAffliate(affiliateData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const affiliateId = this.generateCode();
            const affiliateInstance = this.affiliateRepository.create({
                name: affiliateData.name,
                email: affiliateData.email,
                affiliateId,
            });
            const newAffiliate = yield this.affiliateRepository.save(affiliateInstance);
            const traffic = this.trafficRepository.create({
                country: affiliateData.country,
                openingTime: affiliateData.lead_opening_time,
                closingTime: affiliateData.lead_closing_time,
                affiliate: newAffiliate,
                trafficDays: affiliateData.traffic_days.join(","),
                dailyCap: (_a = affiliateData.dailyCap) !== null && _a !== void 0 ? _a : 50,
            });
            yield this.trafficRepository.save(traffic);
            const user = yield this.authService.registerUser({
                email: `${affiliateData.email}`,
                password: `${core_secrets_1.AFFILIATE_DEFAULT_PASSWORD}`,
                name: affiliateData.name || affiliateId,
            }, {
                affiliate: newAffiliate,
            });
            const apiKey = yield this.apiKeyService.generatePushApiKey(newAffiliate.id);
            return Object.assign(Object.assign(Object.assign(Object.assign({}, affiliateData), user), apiKey), { id: newAffiliate.id });
        });
    }
    addAffliateTraffic(affiliateId, trafficData) {
        return __awaiter(this, void 0, void 0, function* () {
            const trafficInstance = this.trafficRepository.create(Object.assign(Object.assign({}, trafficData), { brand: {
                    id: trafficData.brandId
                }, affiliate: {
                    id: affiliateId
                } }));
            const newTraffic = yield this.trafficRepository.save(trafficInstance);
            return newTraffic;
        });
    }
    deleteAffiliate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.affiliateRepository.delete({ id });
            return { id };
        });
    }
    deleteAffiliateTraffic(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.trafficRepository.delete({ id });
            return { id };
        });
    }
    updateAffiliate(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryData = this.removeEmptyKeysFromObject(updatedData);
            yield this.affiliateRepository.update({ id }, Object.assign({}, queryData));
            return null;
        });
    }
    updateAffiliateTraffic(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryData = this.removeEmptyKeysFromObject(updatedData);
            yield this.affiliateRepository.update({ id }, Object.assign({}, queryData));
            return null;
        });
    }
    removeEmptyKeysFromObject(object) {
        const keys = Object.keys(object);
        const strippedObject = {};
        keys.map(key => {
            if (object[key]) {
                strippedObject[key] = object[key];
            }
        });
        return strippedObject;
    }
}
exports.AffiliateService = AffiliateService;
