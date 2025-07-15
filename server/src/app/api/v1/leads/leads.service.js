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
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
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
        const match = countries_json_1.default.find(({ name, cca2, cca3, altSpellings }) => {
            const lowerAltSpellings = Array.isArray(altSpellings)
                ? altSpellings.map(s => s.toLowerCase())
                : [];
            // Combine all comparison candidates safely
            const candidates = [
                name === null || name === void 0 ? void 0 : name.common,
                name === null || name === void 0 ? void 0 : name.official,
                cca2,
                cca3,
                ...lowerAltSpellings
            ]
                .filter(Boolean) // remove undefined/null
                .map(value => value.toLowerCase());
            return candidates.includes(trimmedInput);
        });
        if (!match) {
            console.error(`Could not match country: "${country}"`);
            throw new core_error_1.BadRequest("Invalid country name");
        }
        return `${match.cca3}-${match.name.common}`;
    }
    /**
     * Gets the primary non-English language of a country.
     * Defaults to 'eng' if none found.
     */
    getCountryLanguage(country) {
        const input = country.trim().toLowerCase();
        const matched = countries_json_1.default.find(({ name, cca2, cca3, altSpellings }) => {
            const altSpellingList = Array.isArray(altSpellings)
                ? altSpellings.map(spelling => spelling.toLowerCase())
                : [];
            const candidates = [
                name === null || name === void 0 ? void 0 : name.common,
                name === null || name === void 0 ? void 0 : name.official,
                cca2,
                cca3,
                ...altSpellingList
            ]
                .filter(Boolean)
                .map(value => value.toLowerCase());
            return candidates.includes(input);
        });
        if (!matched) {
            console.error(`Language match failed for input: "${country}"`);
            throw new core_error_1.BadRequest("Invalid country name");
        }
        const languageKeys = matched.languages
            ? Object.keys(matched.languages)
            : [];
        const nonEnglish = languageKeys.filter(lang => lang !== "eng");
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
                    this.validateTrafficDays(t.trafficDays));
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
        return days ? days.some(day => day.trim().toLowerCase() === today) : true;
    }
    /**
     * Fetches leads for an affiliate or brand using their API key.
     */
    getUserLeads(apiKey, leadQuery, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { affiliate, brand } = yield this.getAffiliateFromAPIKey(apiKey);
            const query = {};
            // Handle is_ftd boolean
            if (leadQuery === null || leadQuery === void 0 ? void 0 : leadQuery.is_ftd) {
                query.is_ftd = true;
            }
            // Handle comma-separated or single value for call_status
            if (leadQuery === null || leadQuery === void 0 ? void 0 : leadQuery.call_status) {
                if (typeof leadQuery.call_status === 'string' && leadQuery.call_status.includes(',')) {
                    query.call_status = (0, typeorm_1.In)(leadQuery.call_status.split(',').map(s => s.trim()));
                }
                else {
                    query.call_status = leadQuery.call_status;
                }
            }
            // Handle email filter
            if (leadQuery === null || leadQuery === void 0 ? void 0 : leadQuery.email) {
                query.email = leadQuery.email;
            }
            // Handle comma-separated or single value for ftd_status
            if (leadQuery === null || leadQuery === void 0 ? void 0 : leadQuery.ftd_status) {
                if (typeof leadQuery.ftd_status === 'string' && leadQuery.ftd_status.includes(',')) {
                    query.ftd_status = (0, typeorm_1.In)(leadQuery.ftd_status.split(',').map(s => s.trim()));
                }
                else {
                    query.ftd_status = leadQuery.ftd_status;
                }
            }
            // Handle date range
            const startDate = (leadQuery === null || leadQuery === void 0 ? void 0 : leadQuery.start_date) ? new Date(leadQuery.start_date) : null;
            const endDate = (leadQuery === null || leadQuery === void 0 ? void 0 : leadQuery.end_date) ? new Date(leadQuery.end_date) : null;
            const isValidStart = startDate && !isNaN(startDate.getTime());
            const isValidEnd = endDate && !isNaN(endDate.getTime());
            if (isValidStart && isValidEnd) {
                query.createdAt = (0, typeorm_2.Between)(startDate, endDate);
            }
            else if (isValidStart) {
                query.createdAt = (0, typeorm_2.MoreThanOrEqual)(startDate);
            }
            else if (isValidEnd) {
                query.createdAt = (0, typeorm_2.LessThanOrEqual)(endDate);
            }
            // Pagination
            const limit = Math.max((_a = pagination === null || pagination === void 0 ? void 0 : pagination.limit) !== null && _a !== void 0 ? _a : 10, 1);
            const page = Math.max((_b = pagination === null || pagination === void 0 ? void 0 : pagination.page) !== null && _b !== void 0 ? _b : 1, 1);
            const offset = (page - 1) * limit;
            // If affiliate is making the request
            if (affiliate) {
                const [affiliateLeads, total] = yield this.leadRepository.findAndCount({
                    where: Object.assign({ affiliate: { id: affiliate.id } }, query),
                    take: limit,
                    skip: offset,
                    order: { createdAt: 'DESC' },
                });
                const paginationMeta = utils_1.PaginationUtility.getPaginationMetaData(total, limit, page);
                return {
                    leads: utils_1.SanitizerProvider.sanitizeObject(affiliateLeads, ["receiver_status", "brand", "lead_status", "affiliate", "rejection_reason"]),
                    pagination: paginationMeta,
                };
            }
            // If brand is making the request
            if (brand) {
                const [brandLeads, total] = yield this.leadRepository.findAndCount({
                    where: Object.assign({ traffic: {
                            brand: { id: brand.id },
                        } }, query),
                    take: limit,
                    skip: offset,
                    order: { createdAt: 'DESC' },
                });
                const paginationMeta = utils_1.PaginationUtility.getPaginationMetaData(total, limit, page);
                return {
                    leads: utils_1.SanitizerProvider.sanitizeObject(brandLeads, ["status", "lead_status", "traffic", "rejection_reason"]),
                    pagination: paginationMeta,
                };
            }
            // No affiliate or brand — return empty result
            const paginationMeta = utils_1.PaginationUtility.getPaginationMetaData(0, limit, page);
            return {
                leads: [],
                pagination: paginationMeta,
            };
        });
    }
    addLeadData(affiliate, leadData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const affiliateId = affiliate.id;
            const country = this.parseCountry(leadData.country);
            const language = this.getCountryLanguage(leadData.country);
            const today = new Date().toISOString().split("T")[0];
            console.log({ leadData, country });
            // 1. Find traffics configured for this affiliate and country
            const traffics = yield this.trafficRepository.find({
                where: {
                    country: (0, typeorm_1.In)([country, leadData.country]),
                    affiliate: { id: affiliateId },
                },
                relations: { lead: true, brand: true },
            });
            console.log({ traffics });
            // 2. No configured traffics
            if (traffics.length === 0) {
                yield this.saveAndSanitizeLead(Object.assign(Object.assign({}, leadData), { affiliate, lead_status: enums_1.LeadStatus.REJECTED, rejection_reason: "Affiliate has no traffic configured for the specified country" }));
                throw new core_error_1.BadRequest("Affiliate has no traffic configured for the specified country");
            }
            // 3. Filter valid traffics by time/day
            const valid = traffics.filter((t) => this.validateTimeRange(t.openingTime, t.closingTime) &&
                this.validateTrafficDays(t.trafficDays));
            // 4. No traffic open at this time/day
            if (!valid.length) {
                yield this.saveAndSanitizeLead(Object.assign(Object.assign({}, leadData), { affiliate, lead_status: enums_1.LeadStatus.REJECTED, rejection_reason: "Lead was submitted outside the traffic's active time or day" }));
                throw new core_error_1.BadRequest("Lead was submitted outside the traffic's active time or day");
            }
            const assigned = new Map();
            // 5. Assign from valid traffics
            for (const traffic of valid.sort((a, b) => b.priority - a.priority)) {
                const todayCount = this.countTodayLeads(traffic, today);
                if (todayCount >= traffic.dailyCap) {
                    yield this.saveAndSanitizeLead(Object.assign(Object.assign({}, leadData), { affiliate, lead_status: enums_1.LeadStatus.REJECTED, rejection_reason: "Traffic has reached its daily lead limit" }));
                    if (traffic.skipFallback) {
                        throw new core_error_1.BadRequest("Traffic has reached its daily lead limit");
                    }
                    continue;
                }
                // 6. Duplicate check — per traffic using email/phone/full combo
                const duplicateLead = yield this.leadRepository.findOne({
                    where: [
                        {
                            traffic: { id: traffic.id },
                            email: leadData.email,
                            firstname: leadData.firstname,
                            lastname: leadData.lastname,
                            phone: leadData.phone,
                        },
                        {
                            traffic: { id: traffic.id },
                            email: leadData.email,
                            phone: leadData.phone,
                        },
                        {
                            traffic: { id: traffic.id },
                            email: leadData.email,
                        },
                        {
                            traffic: { id: traffic.id },
                            phone: leadData.phone,
                        },
                    ],
                    relations: { traffic: true },
                });
                if (duplicateLead) {
                    let reason = "Duplicate lead for this traffic: ";
                    const isFullMatch = duplicateLead.email === leadData.email &&
                        duplicateLead.firstname === leadData.firstname &&
                        duplicateLead.lastname === leadData.lastname &&
                        duplicateLead.phone === leadData.phone;
                    if (isFullMatch) {
                        reason += "same full name, email, and phone already exist";
                    }
                    else if (duplicateLead.email === leadData.email &&
                        duplicateLead.phone === leadData.phone) {
                        reason += "same email and phone already exist";
                    }
                    else if (duplicateLead.email === leadData.email) {
                        reason += "same email already exists";
                    }
                    else {
                        reason += "same phone already exists";
                    }
                    // ❌ Do NOT save duplicate — just throw
                    throw new core_error_1.BadRequest(reason);
                }
                // 7. Respect traffic weight
                const count = (_a = assigned.get(traffic.id)) !== null && _a !== void 0 ? _a : 0;
                if (count >= traffic.weight)
                    continue;
                assigned.set(traffic.id, count + 1);
                // 8. ✅ Save accepted lead
                return this.saveAndSanitizeLead(Object.assign(Object.assign({}, leadData), { traffic,
                    affiliate,
                    language, lead_status: enums_1.LeadStatus.ACCEPTED }));
            }
            // 9. No valid traffic was able to accept the lead
            yield this.saveAndSanitizeLead(Object.assign(Object.assign({}, leadData), { affiliate, lead_status: enums_1.LeadStatus.REJECTED, rejection_reason: "No traffics available for lead assignment after checks" }));
            throw new core_error_1.BadRequest("No traffics available for lead assignment after checks");
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
            const leadRes = yield this.addLeadData(affiliate, leadData);
            const lead = utils_1.SanitizerProvider.sanitizeObject(leadRes, ["receiver_status", "traffic", "lead_status", "affiliate", "rejection_reason"]);
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
    updateLeadStatus(apiKey, leadStatusRequestData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { affiliate } = yield this.getAffiliateFromAPIKey(apiKey);
            const leads = yield Promise.all(leadStatusRequestData.lead_update.map((update) => __awaiter(this, void 0, void 0, function* () {
                const lead = yield this.leadRepository.findOne({
                    where: {
                        affiliate: {
                            id: affiliate === null || affiliate === void 0 ? void 0 : affiliate.id
                        },
                        id: update.lead_id
                    }
                });
                if (!lead) {
                    throw new core_error_1.BadRequest("Lead does not exist");
                }
                lead.status = update.status;
                lead.call_status = update.call_status;
                yield this.leadRepository.save(lead);
                return utils_1.SanitizerProvider.sanitizeObject(lead, ["receiver_status", "lead_status", "affiliate", "rejection_reason"]);
            })));
            return leads;
        });
    }
    updateLeadFtdStatus(apiKey, leadStatusRequestData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { affiliate } = yield this.getAffiliateFromAPIKey(apiKey);
            const leads = yield Promise.all(leadStatusRequestData.lead_update.map((update) => __awaiter(this, void 0, void 0, function* () {
                const lead = yield this.leadRepository.findOne({
                    where: {
                        affiliate: {
                            id: affiliate === null || affiliate === void 0 ? void 0 : affiliate.id
                        },
                        id: update.lead_id
                    }
                });
                if (!lead) {
                    throw new core_error_1.BadRequest("Lead does not exist");
                }
                lead.is_ftd = true;
                lead.ftd_status = update.ftd_status;
                lead.ftd_date = update.ftd_date;
                yield this.leadRepository.save(lead);
                return utils_1.SanitizerProvider.sanitizeObject(lead, ["receiver_status", "lead_status", "affiliate", "rejection_reason"]);
            })));
            return leads;
        });
    }
}
exports.LeadsAPIService = LeadsAPIService;
