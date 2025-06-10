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
const traffic_service_1 = require("./traffic.service");
const service_response_1 = __importDefault(require("../../common/services/service.response"));
class TrafficController {
    constructor(trafficService) {
        this.trafficService = trafficService;
        this.getAllTraffic = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const all_traffic = yield this.trafficService.getTraffic(req.params.id);
                service_response_1.default.sendOkResponse(res, { all_traffic }, "affiliate added successfully");
            }
            catch (error) {
                next(error);
            }
        });
        this.getTrafficDetails = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const traffic = yield this.trafficService.getTrafficDetails(req.params.id);
                service_response_1.default.sendOkResponse(res, { traffic }, "affiliate added successfully");
            }
            catch (error) {
                next(error);
            }
        });
        this.updateTraffic = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updateData = req.body;
            try {
                const traffic = yield this.trafficService.updateAffiliateTraffic(id, updateData);
                service_response_1.default.sendOkResponse(res, { traffic }, `traffic updated successfully`);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new TrafficController(new traffic_service_1.TrafficService());
