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
exports.LeadService = void 0;
const lead_entity_1 = require("../../common/entities/lead.entity");
const statusMap_entity_1 = require("../../common/entities/statusMap.entity");
const core_db_1 = require("../../core/core.db");
const core_error_1 = require("../../core/core.error");
const utils_1 = require("../../lib/utils");
class LeadService {
    constructor() {
        this.leadRepository = core_db_1.AppDataSource.getRepository(lead_entity_1.LeadEntity);
        this.statusMapRepository = core_db_1.AppDataSource.getRepository(statusMap_entity_1.StatusMapEntity);
    }
    /**
     * Fetch all leads with related traffic, brand, and affiliate data.
     */
    getLeads(ftdQuery, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // Build where clause dynamically
            const whereClause = {};
            if (ftdQuery && typeof ftdQuery.is_ftd === "boolean") {
                whereClause.is_ftd = ftdQuery.is_ftd;
            }
            // Default pagination values
            const limit = (_a = pagination === null || pagination === void 0 ? void 0 : pagination.limit) !== null && _a !== void 0 ? _a : 10;
            const page = (_b = pagination === null || pagination === void 0 ? void 0 : pagination.page) !== null && _b !== void 0 ? _b : 1;
            const offset = (page - 1) * limit;
            // Fetch leads and status maps concurrently
            const [[leadsRes, count], statusMap] = yield Promise.all([
                this.leadRepository.findAndCount({
                    where: whereClause,
                    relations: { traffic: { brand: true, affiliate: true } },
                    take: limit,
                    skip: offset,
                }),
                this.statusMapRepository.find()
            ]);
            // Create maps for quick lookup
            // const groupMapByType = (type: StatusMapType) => {
            //   return new Map(
            //     statusMap
            //       .filter(item => item.status_type === type)
            //       .map(item => [item.from_status.toLowerCase(), item])
            //   );
            // };
            // const callStatusMap = groupMapByType(StatusMapType.CALL);
            // const ftdStatusMap = groupMapByType(StatusMapType.FTD);
            // const mainStatusMap = groupMapByType(StatusMapType.STATUS);
            // Transform leads
            const leads = leadsRes.map((lead) => {
                // const callStatus = callStatusMap.get(lead.call_status.toLowerCase());
                // const ftdStatus = ftdStatusMap.get(lead.call_status.toLowerCase());
                // const status = mainStatusMap.get(lead.call_status.toLowerCase());
                // if (callStatus) {
                //   lead.original_call_status = lead.call_status
                //   lead.call_status = callStatus.from_status
                // };
                // if (lead.is_ftd && ftdStatus) {
                //   lead.original_ftd_status = lead.ftd_status
                //   lead.ftd_status = ftdStatus.from_status
                // };
                // if (status) {
                //   lead.original_status = lead.status
                //   lead.status = status.from_status
                // };
                return lead;
            });
            // Build pagination metadata
            const paginationMeta = utils_1.PaginationUtility.getPaginationMetaData(count, limit, page);
            return {
                leads,
                total: count,
                pagination: paginationMeta,
            };
        });
    }
    /**
     * Fetch a single lead by ID, throwing if not found.
     */
    getLead(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const lead = yield this.leadRepository.findOne({
                where: { id },
                relations: { traffic: { brand: true, affiliate: true } },
            });
            if (!lead) {
                throw new core_error_1.NotFoundError(`Lead with ID ${id} not found`);
            }
            // Fetch all status maps
            const statusMap = yield this.statusMapRepository.find();
            return lead;
        });
    }
    /**
     * Create and save a new lead.
     */
    addLead(newLeadData) {
        return __awaiter(this, void 0, void 0, function* () {
            const lead = this.leadRepository.create(newLeadData);
            return this.leadRepository.save(lead);
        });
    }
    /**
     * Update an existing lead by ID.
     * Throws if the lead does not exist.
     */
    updateLead(id, updatedLeadData) {
        return __awaiter(this, void 0, void 0, function* () {
            const lead = yield this.getLead(id);
            this.leadRepository.merge(lead, updatedLeadData);
            return this.leadRepository.save(lead);
        });
    }
    /**
     * Delete a lead by ID.
     * Throws if the lead does not exist.
     */
    deleteLead(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const lead = yield this.getLead(id);
            yield this.leadRepository.remove(lead);
        });
    }
}
exports.LeadService = LeadService;
