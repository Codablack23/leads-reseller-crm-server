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
exports.BrandAPIService = void 0;
const brand_service_1 = require("../../../brand/brand.service");
class BrandAPIService {
    constructor() {
        this.brandService = new brand_service_1.BrandService();
    }
    addBrand(requestData) {
        return __awaiter(this, void 0, void 0, function* () {
            const brand = yield this.brandService.addBrand(requestData);
            return brand;
        });
    }
}
exports.BrandAPIService = BrandAPIService;
