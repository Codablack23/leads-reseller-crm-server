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
exports.StatusMapService = void 0;
const affiliate_entity_1 = require("../../../common/entities/affiliate.entity");
const lead_entity_1 = require("../../../common/entities/lead.entity");
const statusList_entity_1 = require("../../../common/entities/statusList.entity");
const statusMap_entity_1 = require("../../../common/entities/statusMap.entity");
const core_db_1 = require("../../../core/core.db");
const core_error_1 = require("../../../core/core.error");
const utils_1 = require("../../../lib/utils");
class StatusMapService {
    constructor() {
        this.statusMapRepository = core_db_1.AppDataSource.getRepository(statusMap_entity_1.StatusMapEntity);
        this.statusListRepository = core_db_1.AppDataSource.getRepository(statusList_entity_1.StatusListEntity);
        this.leadRepository = core_db_1.AppDataSource.getRepository(lead_entity_1.LeadEntity);
        this.affiliateRepository = core_db_1.AppDataSource.getRepository(affiliate_entity_1.AffiliateEntity);
    }
    /**
     * Fetch all leads with related traffic, brand, and affiliate data.
     */
    getUnmappedStatus(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // Build where clause dynamically
            const whereClause = {};
            // Default pagination values
            const limit = (_a = pagination === null || pagination === void 0 ? void 0 : pagination.limit) !== null && _a !== void 0 ? _a : 10;
            const page = (_b = pagination === null || pagination === void 0 ? void 0 : pagination.page) !== null && _b !== void 0 ? _b : 1;
            const offset = (page - 1) * limit;
            const [unmapped_status, total] = yield this.leadRepository
                .createQueryBuilder("lead")
                .leftJoinAndSelect("lead.statusMap", "statusMap")
                .leftJoinAndSelect("lead.traffic", "traffic")
                .leftJoinAndSelect("traffic.affiliate", "affiliate")
                .where("statusMap.id IS NULL") // only leads with no statusMap
                .skip(offset)
                .take(limit)
                .getManyAndCount();
            // Get pagination metadata
            const paginationMeta = utils_1.PaginationUtility.getPaginationMetaData(total, limit, page);
            return { unmapped_status, total, pagination: paginationMeta };
        });
    }
    /**
   * Fetch all leads with related traffic, brand, and affiliate data.
   */
    getStatusMap(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // Build where clause dynamically
            const whereClause = {};
            // Default pagination values
            const limit = (_a = pagination === null || pagination === void 0 ? void 0 : pagination.limit) !== null && _a !== void 0 ? _a : 10;
            const page = (_b = pagination === null || pagination === void 0 ? void 0 : pagination.page) !== null && _b !== void 0 ? _b : 1;
            const offset = (page - 1) * limit;
            // Query leads with pagination and relations
            const [status_map, count] = yield this.statusMapRepository.findAndCount({
                where: whereClause,
                relations: ["status"],
                take: limit,
                skip: offset,
            });
            // Get pagination metadata
            const paginationMeta = utils_1.PaginationUtility.getPaginationMetaData(count, limit, page);
            return { status_map, total: count, pagination: paginationMeta };
        });
    }
    /**
     * Fetch a single lead by ID, throwing if not found.
     */
    getStatusMapById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const status_map = yield this.statusMapRepository.findOne({
                where: { id },
            });
            if (!status_map) {
                throw new core_error_1.NotFoundError(`Status Map with ID ${id} not found`);
            }
            return status_map;
        });
    }
    /**
     * Create and save a new lead.
     */
    addStatusMap(_a) {
        return __awaiter(this, arguments, void 0, function* ({ status_id, status_text, lead_id, affiliate_id, }) {
            const [lead, status, affiliate] = yield Promise.all([
                this.leadRepository.findOne({ where: { id: lead_id } }),
                yield this.statusListRepository.findOne({ where: { id: status_id } }),
                yield this.affiliateRepository.findOne({ where: { id: affiliate_id } })
            ]);
            if (!lead)
                throw new core_error_1.BadRequest("lead not found");
            if (!status)
                throw new core_error_1.BadRequest("Status not found");
            if (!affiliate)
                throw new core_error_1.BadRequest("Affiliate not found");
            const statusMap = this.statusMapRepository.create({ lead, status, affiliate, status_text });
            const newStatusMap = yield this.statusMapRepository.save(statusMap);
            return newStatusMap;
        });
    }
    /**
     * Update an existing lead by ID.
     * Throws if the lead does not exist.
     */
    updateStatusMap(id, updatedLeadData) {
        return __awaiter(this, void 0, void 0, function* () {
            const lead = yield this.getStatusMapById(id);
            this.statusMapRepository.merge(lead, updatedLeadData);
            return this.statusMapRepository.save(lead);
        });
    }
    /**
     * Delete a lead by ID.
     * Throws if the lead does not exist.
     */
    deleteStatusMap(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const lead = yield this.getStatusMapById(id);
            yield this.statusMapRepository.remove(lead);
        });
    }
}
exports.StatusMapService = StatusMapService;
