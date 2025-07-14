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
const leads_service_1 = require("./leads.service");
const service_response_1 = __importDefault(require("../../../../common/services/service.response"));
const providers_1 = require("../../../../common/providers");
class LeadsAPIController {
    constructor(leadApiService) {
        this.leadApiService = leadApiService;
        this.getLeads = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const apiKey = req.query.apiKey;
                const leadQuery = providers_1.QueryProvider.extractQuery(req);
                const paginatedQuery = providers_1.QueryProvider.usePagination(req);
                const data = yield this.leadApiService.getUserLeads(apiKey, leadQuery, paginatedQuery);
                service_response_1.default.sendOkResponse(res, data, "Leads fetched successfully");
            }
            catch (error) {
                next(error);
            }
        });
        this.addLead = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const apiKey = req.query.apiKey;
            try {
                const lead = yield this.leadApiService.addLead(apiKey, req.body);
                service_response_1.default.sendOkResponse(res, { lead }, "Lead added successfully");
            }
            catch (error) {
                next(error);
            }
        });
        this.updateLeadStatus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const apiKey = req.query.apiKey;
            try {
                yield this.leadApiService.updateLeadStatus(apiKey, req.body);
                service_response_1.default.sendOkResponse(res, {}, "Lead status updated successfully");
            }
            catch (error) {
                next(error);
            }
        });
        this.updateFtdStatus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const apiKey = req.query.apiKey;
            try {
                yield this.leadApiService.updateLeadFtdStatus(apiKey, req.body);
                service_response_1.default.sendOkResponse(res, {}, "Lead ftd status updated successfully");
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new LeadsAPIController(new leads_service_1.LeadsAPIService());
