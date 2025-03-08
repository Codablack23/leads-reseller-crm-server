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
const service_response_1 = __importDefault(require("../../common/services/service.response"));
class BrandController {
    constructor(brandService) {
        this.brandService = brandService;
        this.getBrands = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const brands = yield this.brandService.getBrands();
                service_response_1.default.sendOkResponse(res, { brands }, "brands retrieved successfully");
            }
            catch (error) {
                next(error);
            }
        });
        this.getBrand = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const brand = yield this.brandService.getBrand(req.params.id);
                service_response_1.default.sendOkResponse(res, { brand }, "brands retrieved successfully");
            }
            catch (error) {
                next(error);
            }
        });
        this.addBrand = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const brand = yield this.brandService.addBrand(req.body);
                service_response_1.default.sendOkResponse(res, { brand }, "brand added successfully");
            }
            catch (error) {
                next(error);
            }
        });
        this.updateBrand = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const brand = yield this.brandService.updateBrand(req.params.id, req.body);
                service_response_1.default.sendOkResponse(res, { brand }, "brand updated successfully");
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteBrand = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const brands = yield this.brandService.deleteBrand(req.params.id);
                service_response_1.default.sendOkResponse(res, { brands }, "brands deleted successfully");
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new BrandController(new brand_service_1.BrandService());
