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
class BrandController {
    constructor() {
        this.getBrands = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        });
        this.getBrand = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        });
        this.addBrand = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        });
        this.updateBrand = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        });
        this.deleteBrands = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = new BrandController();
