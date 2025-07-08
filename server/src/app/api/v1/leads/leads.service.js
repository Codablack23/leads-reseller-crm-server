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
exports.LeadsAPIService = void 0;
const apiKey_entity_1 = require("../../../../common/entities/apiKey.entity");
const core_db_1 = require("../../../../core/core.db");
const traffic_entity_1 = require("../../../../common/entities/traffic.entity");
const lead_entity_1 = require("../../../../common/entities/lead.entity");
const luxon_1 = require("luxon");
const core_error_1 = require("../../../../core/core.error");
const countries_json_1 = __importDefault(require("../../../../lib/data/countries.json"));
const utils_1 = require("../../../../lib/utils");
const enums_1 = require("../../../../common/enums");
/**
 * LeadsAPIService handles lead validation, assignment, and affiliate tracking.
 */
class LeadsAPIService {
    constructor() {
        this.trafficRepository = core_db_1.AppDataSource.getRepository(traffic_entity_1.TrafficEntity);
        this.leadRepository = core_db_1.AppDataSource.getRepository(lead_entity_1.LeadEntity);
        this.apiKeyRepository = core_db_1.AppDataSource.getRepository(apiKey_entity_1.APIKeyEntity);
    }
    /**
     * Parses and standardizes a country input to system format.
     * Throws if no valid match is found.
     */
    parseCountry(country) {
        const trimmedInput = country.trim().toLowerCase();
        const match = countries_json_1.default.find(({ name, cca2, cca3 }) => [name === null || name === void 0 ? void 0 : name.common, name === null || name === void 0 ? void 0 : name.official, cca2, cca3].some(part => (part === null || part === void 0 ? void 0 : part.toLowerCase()) === trimmedInput));
        if (!match)
            throw new core_error_1.BadRequest("Invalid country name");
        return `${match.cca3}-${match.name.common}`;
    }
    /**
     * Gets the primary non-English language of a country.
     * Defaults to 'eng' if none found.
     */
    getCountryLanguage(country) {
        const input = country.trim().toLowerCase();
        const matched = countries_json_1.default.find(({ name, cca2, cca3 }) => [name === null || name === void 0 ? void 0 : name.common, name === null || name === void 0 ? void 0 : name.official, cca2, cca3].some(part => (part === null || part === void 0 ? void 0 : part.toLowerCase()) === input));
        if (!matched)
            throw new core_error_1.BadRequest("Invalid country name");
        const nonEnglish = Object.keys(matched.languages || {}).filter(lang => lang !== "eng");
        return nonEnglish[0] || "eng";
    }
    /**
     * Retrieves the most eligible traffic for an affiliate within a country.
     */
    getAffiliateTraffic(affiliateId, countryInput) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const country = this.parseCountry(countryInput);
                const traffics = yield this.trafficRepository.find({
                    where: { country, affiliate: { id: affiliateId } },
                    relations: { lead: true },
                });
                if (!traffics.length)
                    throw new core_error_1.BadRequest("Country not allowed");
                const valid = traffics.filter(t => this.validateTimeRange(t.openingTime, t.closingTime) &&
                    this.validateTrafficDays(t.trafficDays.split(",")));
                if (!valid.length)
                    throw new core_error_1.BadRequest("Invalid time/day for leads");
                const today = new Date().toISOString().split("T")[0];
                const assigned = new Map();
                for (const traffic of valid.sort((a, b) => b.priority - a.priority)) {
                    const todayCount = this.countTodayLeads(traffic, today);
                    if (todayCount >= traffic.dailyCap)
                        continue;
                    const count = (_a = assigned.get(traffic.id)) !== null && _a !== void 0 ? _a : 0;
                    if (count >= traffic.weight)
                        continue;
                    assigned.set(traffic.id, count + 1);
                    return [traffic, null];
                }
                throw new core_error_1.BadRequest("No eligible traffic found");
            }
            catch (err) {
                return [null, err.message];
            }
        });
    }
    /**
     * Checks whether the current time falls within the given time range.
     */
    validateTimeRange(openingTime, closingTime) {
        const now = luxon_1.DateTime.now();
        const format = openingTime.length === 5 ? "HH:mm" : "HH:mm:ss";
        const open = luxon_1.DateTime.fromFormat(openingTime, format).set(now.toObject());
        const close = luxon_1.DateTime.fromFormat(closingTime, format).set(now.toObject());
        if (close < open) {
            // Overnight range
            return now >= open || now <= close;
        }
        return now >= open && now <= close;
    }
    /**
     * Checks if the current day matches any traffic active days.
     */
    validateTrafficDays(days) {
        const today = luxon_1.DateTime.now().toFormat("cccc").toLowerCase();
        return days.some(day => day.trim().toLowerCase() === today);
    }
    /**
     * Fetches leads for an affiliate or brand using their API key.
     */
    getUserLeads(apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const { affiliate, brand } = yield this.getAffiliateFromAPIKey(apiKey);
            return this.leadRepository.find({
                where: {
                    traffic: Object.assign({}, (affiliate ? { affiliate } : { brand }))
                },
            });
        });
    }
    /**
     * Adds a lead and assigns it to eligible traffic if found.
     */
    addLeadData(affiliate, leadData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const affiliateId = affiliate.id;
            const country = this.parseCountry(leadData.country);
            const language = this.getCountryLanguage(leadData.country);
            const today = new Date().toISOString().split("T")[0];
            const traffics = yield this.trafficRepository.find({
                where: { country, affiliate: { id: affiliateId } },
                relations: { lead: true },
            });
            if (!traffics.length) {
                return this.saveAndSanitizeLead(Object.assign(Object.assign({}, leadData), { affiliate, lead_status: enums_1.LeadStatus.REJECTED, rejection_reason: "Affiliate has no traffic configured for the specified country" }));
            }
            const valid = traffics.filter(t => this.validateTimeRange(t.openingTime, t.closingTime) &&
                this.validateTrafficDays(t.trafficDays.split(",")));
            if (!valid.length) {
                return this.saveAndSanitizeLead(Object.assign(Object.assign({}, leadData), { affiliate, lead_status: enums_1.LeadStatus.REJECTED, rejection_reason: "Lead was submitted outside the traffic's active time or day" }));
            }
            const assigned = new Map();
            for (const traffic of valid.sort((a, b) => b.priority - a.priority)) {
                const todayCount = this.countTodayLeads(traffic, today);
                if (todayCount >= traffic.dailyCap) {
                    const rejected = yield this.saveAndSanitizeLead(Object.assign(Object.assign({}, leadData), { affiliate, lead_status: enums_1.LeadStatus.REJECTED, rejection_reason: "Traffic has reached its daily lead limit" }));
                    if (traffic.skipFallback)
                        return rejected;
                    continue;
                }
                const count = (_a = assigned.get(traffic.id)) !== null && _a !== void 0 ? _a : 0;
                if (count >= traffic.weight)
                    continue;
                assigned.set(traffic.id, count + 1);
                return this.saveAndSanitizeLead(Object.assign(Object.assign({}, leadData), { traffic,
                    affiliate,
                    language, lead_status: enums_1.LeadStatus.ACCEPTED }));
            }
            return this.saveAndSanitizeLead(Object.assign(Object.assign({}, leadData), { affiliate, lead_status: enums_1.LeadStatus.REJECTED, rejection_reason: "No traffics available for lead assignment after checks" }));
        });
    }
    /**
     * Saves and sanitizes a lead object.
     */
    saveAndSanitizeLead(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const lead = this.leadRepository.create(payload);
            const saved = yield this.leadRepository.save(lead);
            return utils_1.SanitizerProvider.sanitizeObject(saved, ["traffic.lead"]);
        });
    }
    /**
     * Counts how many leads were created today for a given traffic.
     */
    countTodayLeads(traffic, today) {
        return traffic.lead.filter(l => l.createdAt.toISOString().split("T")[0] === today).length;
    }
    /**
     * Adds a lead using an API key to fetch affiliate.
     */
    addLead(apiKey, leadData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { affiliate } = yield this.getAffiliateFromAPIKey(apiKey);
            if (!affiliate)
                throw new core_error_1.BadRequest("Invalid API Key for affiliate");
            const lead = yield this.addLeadData(affiliate, leadData);
            return { lead };
        });
    }
    /**
     * Resolves affiliate and brand information from API key.
     */
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
exports.LeadsAPIService = LeadsAPIService;
