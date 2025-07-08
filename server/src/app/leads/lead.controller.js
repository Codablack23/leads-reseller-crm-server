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
const lead_service_1 = require("./lead.service");
const providers_1 = require("../../common/providers");
const service_response_1 = __importDefault(require("../../common/services/service.response"));
class LeadController {
    constructor(leadService) {
        this.leadService = leadService;
        /**
         * GET /leads
         * Retrieves all leads.
         */
        this.getLeads = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const ftdQuery = providers_1.QueryProvider.useFtdQuery(req);
                const paginatedQuery = providers_1.QueryProvider.usePagination(req);
                const data = yield this.leadService.getLeads(ftdQuery, paginatedQuery);
                res.status(200).json({
                    status: "success",
                    data,
                });
            }
            catch (err) {
                next(err);
            }
        });
        this.getLeadStats = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = this.leadService.getLeadStats();
                service_response_1.default.sendOkResponse(res, { data }, "Leads Statistics retrieved");
            }
            catch (err) {
                next(err);
            }
        });
        /**
         * GET /leads/:id
         * Retrieves a single lead by ID.
         */
        this.getLead = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const lead = yield this.leadService.getLead(id);
                res.status(200).json({
                    status: "success",
                    data: { lead },
                });
            }
            catch (err) {
                next(err);
            }
        });
        /**
         * POST /leads
         * Creates a new lead.
         */
        this.addLead = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newLead = yield this.leadService.addLead(req.body);
                res.status(201).json({
                    status: "success",
                    data: { lead: newLead },
                });
            }
            catch (err) {
                next(err);
            }
        });
        /**
         * PUT /leads/:id
         * Updates an existing lead by ID.
         */
        this.updateLead = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedLead = yield this.leadService.updateLead(id, req.body);
                res.status(200).json({
                    status: "success",
                    data: { lead: updatedLead },
                });
            }
            catch (err) {
                next(err);
            }
        });
        /**
         * DELETE /leads/:id
         * Deletes a lead by ID.
         */
        this.deleteLead = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.leadService.deleteLead(id);
                res.sendStatus(204);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new LeadController(new lead_service_1.LeadService());
