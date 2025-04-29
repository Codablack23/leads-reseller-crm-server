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
const brand_service_1 = require("./brand.service");
const service_response_1 = __importDefault(require("../../../../common/services/service.response"));
class BrandAPIController {
    constructor(brandApiService) {
        this.brandApiService = brandApiService;
        this.addBrand = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const brand = yield this.brandApiService.addBrand(req.body);
                service_response_1.default.sendOkResponse(res, { brand }, "Brand added successfully");
            }
            catch (error) {
                next(error);
            }
        });
        this.getLeadStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = new BrandAPIController(new brand_service_1.BrandAPIService());
