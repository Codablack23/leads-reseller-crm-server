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
const core_db_1 = require("../../core/core.db");
const core_error_1 = require("../../core/core.error");
class LeadService {
    constructor() {
        this.leadRepository = core_db_1.AppDataSource.getRepository(lead_entity_1.LeadEntity);
    }
    /**
     * Fetch all leads with related traffic, brand, and affiliate data.
     */
    getLeads() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.leadRepository.find({
                relations: { traffic: { brand: true, affiliate: true } },
            });
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
