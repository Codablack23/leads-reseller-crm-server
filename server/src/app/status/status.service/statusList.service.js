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
exports.StatusListService = void 0;
const statusList_entity_1 = require("../../../common/entities/statusList.entity");
const core_db_1 = require("../../../core/core.db");
const core_error_1 = require("../../../core/core.error");
const utils_1 = require("../../../lib/utils");
class StatusListService {
    constructor() {
        this.statusListRepository = core_db_1.AppDataSource.getRepository(statusList_entity_1.StatusListEntity);
    }
    /**
     * Fetch all leads with related traffic, brand, and affiliate data.
     */
    getStatusList(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // Build where clause dynamically
            const whereClause = {};
            // Default pagination values
            const limit = (_a = pagination === null || pagination === void 0 ? void 0 : pagination.limit) !== null && _a !== void 0 ? _a : 10;
            const page = (_b = pagination === null || pagination === void 0 ? void 0 : pagination.page) !== null && _b !== void 0 ? _b : 1;
            const offset = (page - 1) * limit;
            // Query leads with pagination and relations
            const [status_list, count] = yield this.statusListRepository.findAndCount({
                where: whereClause,
                take: limit,
                skip: offset,
            });
            // Get pagination metadata
            const paginationMeta = utils_1.PaginationUtility.getPaginationMetaData(count, limit, page);
            return { status_list, total: count, pagination: paginationMeta };
        });
    }
    /**
     * Fetch a single lead by ID, throwing if not found.
     */
    getStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.statusListRepository.findOne({
                where: { id },
            });
            if (!status) {
                throw new core_error_1.NotFoundError(`Status Map with ID ${id} not found`);
            }
            return status;
        });
    }
    /**
     * Create and save a new lead.
     */
    addStatus(newStatusMap) {
        return __awaiter(this, void 0, void 0, function* () {
            const newStatus = this.statusListRepository.create(newStatusMap);
            return this.statusListRepository.save(newStatus);
        });
    }
    /**
     * Update an existing lead by ID.
     * Throws if the lead does not exist.
     */
    updateStatus(id, updatedLeadData) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.getStatus(id);
            this.statusListRepository.merge(status, updatedLeadData);
            return this.statusListRepository.save(status);
        });
    }
    /**
     * Delete a lead by ID.
     * Throws if the lead does not exist.
     */
    deleteStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.getStatus(id);
            yield this.statusListRepository.remove(status);
        });
    }
}
exports.StatusListService = StatusListService;
