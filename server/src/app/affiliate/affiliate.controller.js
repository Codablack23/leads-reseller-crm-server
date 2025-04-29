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
const affiliate_service_1 = require("./affiliate.service");
const service_response_1 = __importDefault(require("../../common/services/service.response"));
class AffiliateController {
    constructor(affiliateService) {
        this.affiliateService = affiliateService;
        this.getAffliates = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const affiliates = yield this.affiliateService.getAffiliates();
                service_response_1.default.sendOkResponse(res, { affiliates }, "affiliates retrieved successfully");
            }
            catch (error) {
                next(error);
            }
        });
        this.getAffliate = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const affiliate = yield this.affiliateService.getAffiliate(id);
                service_response_1.default.sendOkResponse(res, { affiliate }, "affiliate retrieved successfully");
            }
            catch (error) {
                next(error);
            }
        });
        this.addAffiliate = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const affiliate = yield this.affiliateService.addAffliate(req.body);
                service_response_1.default.sendOkResponse(res, { affiliate }, "affiliate added successfully");
            }
            catch (error) {
                next(error);
            }
        });
        this.addAffiliateTraffic = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const traffic = yield this.affiliateService.addAffliateTraffic(req.params.id, req.body);
                service_response_1.default.sendOkResponse(res, { traffic }, "affiliate added successfully");
            }
            catch (error) {
                next(error);
            }
        });
        this.getAllAffiliateTraffic = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const traffic = yield this.affiliateService.getAffiliatesTraffic(req.params.id);
                service_response_1.default.sendOkResponse(res, { traffic }, "affiliate added successfully");
            }
            catch (error) {
                next(error);
            }
        });
        this.getAffiliateTrafficDetails = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const traffic = yield this.affiliateService.getAffiliateTrafficDetails(req.params.id);
                service_response_1.default.sendOkResponse(res, { traffic }, "affiliate added successfully");
            }
            catch (error) {
                next(error);
            }
        });
        this.updateAffiliate = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updateData = req.body;
            try {
                const affiliate = yield this.affiliateService.updateAffiliate(id, updateData);
                service_response_1.default.sendOkResponse(res, { affiliate }, `affiliate updated successfully`);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateAffiliateTraffic = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updateData = req.body;
            try {
                const affiliate = yield this.affiliateService.updateAffiliateTraffic(id, updateData);
                service_response_1.default.sendOkResponse(res, { affiliate }, `affiliate updated successfully`);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteAffiliate = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const affiliate = yield this.affiliateService.deleteAffiliate(id);
                service_response_1.default.sendOkResponse(res, { affiliate }, `affiliate deleted successfully`);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteAffiliateTraffic = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const affiliate = yield this.affiliateService.deleteAffiliateTraffic(id);
                service_response_1.default.sendOkResponse(res, { affiliate }, `affiliate deleted successfully`);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AffiliateController(new affiliate_service_1.AffiliateService());
