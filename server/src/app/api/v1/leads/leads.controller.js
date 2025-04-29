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
class LeadsAPIController {
    constructor(leadApiService) {
        this.leadApiService = leadApiService;
        this.getLeads = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const apiKey = req.query.apiKey;
                const leads = yield this.leadApiService.getUserLeads(apiKey);
                service_response_1.default.sendOkResponse(res, { leads }, "Leads fetched successfully");
            }
            catch (error) {
                next(error);
            }
        });
        this.addLead = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const apiKey = req.query.apiKey;
            try {
                const lead = yield this.leadApiService.addLead(apiKey, req.body);
                service_response_1.default.sendOkResponse(res, { lead }, "Lead added successfull");
            }
            catch (error) {
                next(error);
            }
        });
        this.getLeadStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = new LeadsAPIController(new leads_service_1.LeadsAPIService());
