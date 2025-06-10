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
class LeadsAPIService {
    constructor() {
        this.trafficRepository = core_db_1.AppDataSource.getRepository(traffic_entity_1.TrafficEntity);
        this.leadRepository = core_db_1.AppDataSource.getRepository(lead_entity_1.LeadEntity);
        this.apiKeyRepository = core_db_1.AppDataSource.getRepository(apiKey_entity_1.APIKeyEntity);
    }
    parseCountry(country) {
        const trimmedInput = country.trim().toLowerCase();
        const searchCountry = countries_json_1.default.find(({ name, cca2, cca3 }) => {
            var _a, _b;
            const common = (_a = name === null || name === void 0 ? void 0 : name.common) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            const official = (_b = name === null || name === void 0 ? void 0 : name.official) === null || _b === void 0 ? void 0 : _b.toLowerCase();
            const code = cca3 === null || cca3 === void 0 ? void 0 : cca3.toLowerCase();
            const code2 = cca2 === null || cca2 === void 0 ? void 0 : cca2.toLowerCase();
            return (common === trimmedInput ||
                official === trimmedInput ||
                code === trimmedInput ||
                code2 === trimmedInput);
        });
        if (!searchCountry) {
            throw new core_error_1.BadRequest("Invalid country name");
        }
        return `${searchCountry.cca3}-${searchCountry.name.common}`;
    }
    getAffiliateTraffic(affiliateId, countryString) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // Parse country to system format
            const country = this.parseCountry(countryString);
            // Fetch traffics with related leads (to count leads per traffic)
            const traffics = yield this.trafficRepository.find({
                where: { country, affiliate: { id: affiliateId } },
                relations: { lead: true },
            });
            if (traffics.length === 0) {
                throw new core_error_1.BadRequest("Sorry you cannot send in leads for this country");
            }
            // Filter traffics valid for current time and day
            const validTraffics = traffics.filter(t => {
                const isNowTimeSupported = this.validateTimeRange(t.openingTime, t.closingTime);
                const isTodaySupported = this.validateTrafficDays(t.trafficDays.split(","));
                return isNowTimeSupported && isTodaySupported;
            });
            if (validTraffics.length === 0) {
                throw new core_error_1.BadRequest("Sorry you cannot send leads at this time or day");
            }
            // Sort traffics by descending priority (highest priority first)
            const sortedTraffics = [...validTraffics].sort((a, b) => b.priority - a.priority);
            // Get today's date string (to filter leads created today)
            const today = new Date().toISOString().split("T")[0];
            // Helper: count leads created today for a given traffic
            const countTodayLeads = (traffic) => {
                return traffic.lead.filter(lead => {
                    const leadDate = lead.createdAt.toISOString().split("T")[0];
                    return leadDate === today;
                }).length;
            };
            // Track how many leads have been assigned to each traffic in this request cycle (weight distribution)
            // Since we assign only one lead per request, this is basically to check if weight allows assignment.
            // Ideally, you might track this globally (e.g., cache or DB) if multiple leads per second are possible.
            // For this example, assume 0 leads assigned this cycle (or extend if you keep state)
            const assignedThisCycle = new Map();
            // Find first eligible traffic based on priority, weight, and daily cap
            for (const traffic of sortedTraffics) {
                const todayLeadCount = countTodayLeads(traffic);
                // Daily cap check
                if (todayLeadCount >= traffic.dailyCap) {
                    continue; // daily cap reached, skip this traffic
                }
                // Weight distribution check:
                // For simplicity assume 0 assigned this cycle if no global tracking yet
                const assignedCount = (_a = assignedThisCycle.get(traffic.id)) !== null && _a !== void 0 ? _a : 0;
                if (assignedCount >= traffic.weight) {
                    continue; // weight quota reached, skip this traffic
                }
                // Eligible traffic found, update assignedThisCycle count and return traffic
                assignedThisCycle.set(traffic.id, assignedCount + 1);
                return traffic; // return this traffic for lead assignment
            }
            // If none found, throw error
            throw new core_error_1.BadRequest("No traffics available for lead assignment after checks");
        });
    }
    validateTimeRange(openingTime, closingTime) {
        const now = luxon_1.DateTime.now();
        const format = openingTime.length === 5 ? 'HH:mm' : 'HH:mm:ss';
        const openDT = luxon_1.DateTime.fromFormat(openingTime, format).set({
            year: now.year,
            month: now.month,
            day: now.day,
        });
        const closeDT = luxon_1.DateTime.fromFormat(closingTime, format).set({
            year: now.year,
            month: now.month,
            day: now.day,
        });
        if (closeDT < openDT) {
            // Overnight range: e.g. 22:00 - 04:00
            return now >= openDT || now <= closeDT;
        }
        return now >= openDT && now <= closeDT;
    }
    validateTrafficDays(trafficDays) {
        const now = luxon_1.DateTime.now();
        const currentDayName = now.toFormat('cccc').toLowerCase(); // full day name lowercase
        return trafficDays.some(day => day.trim().toLowerCase() === currentDayName);
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
            if (!affiliate)
                throw new core_error_1.BadRequest("Invalid API Key for affiliate");
            const traffic = yield this.getAffiliateTraffic(affiliate === null || affiliate === void 0 ? void 0 : affiliate.id, leadData.country);
            const newLead = this.leadRepository.create(Object.assign(Object.assign({}, leadData), { traffic }));
            const lead = yield this.leadRepository.save(newLead);
            const sanitizedLead = utils_1.SanitizerProvider.sanitizeObject(lead, ["traffic.lead"]);
            return { lead: sanitizedLead };
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
