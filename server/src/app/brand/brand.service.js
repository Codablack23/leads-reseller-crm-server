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
exports.BrandService = void 0;
const brand_entity_1 = require("../../common/entities/brand.entity");
const core_db_1 = require("../../core/core.db");
const core_error_1 = require("../../core/core.error");
const auth_service_1 = require("../auth/auth.service");
const core_secrets_1 = require("../../core/core.secrets");
class BrandService {
    constructor() {
        this.brandRepository = core_db_1.AppDataSource.getRepository(brand_entity_1.BrandEntity);
        this.authService = new auth_service_1.AuthService();
    }
    getBrands() {
        return __awaiter(this, void 0, void 0, function* () {
            const brands = yield this.brandRepository.find();
            return brands;
        });
    }
    getBrand(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const brand = yield this.brandRepository.findOne({
                where: { id }
            });
            if (!brand)
                throw new core_error_1.NotFoundError("Sorry could not find brand");
            return brand;
        });
    }
    addBrand(brandData) {
        return __awaiter(this, void 0, void 0, function* () {
            const brandInstance = this.brandRepository.create(Object.assign({}, brandData));
            const newBrand = yield this.brandRepository.save(brandInstance);
            const user = yield this.authService.registerUser({
                name: `${newBrand.name}`,
                password: `${core_secrets_1.BRAND_DEFAULT_PASSWORD}`,
                email: `${newBrand.email}`
            }, {
                brand: newBrand,
            });
            return Object.assign(Object.assign(Object.assign({}, brandData), user), { id: newBrand.id });
        });
    }
    deleteBrand(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.brandRepository.delete({ id });
            return { id };
        });
    }
    updateBrand(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryData = this.removeEmptyKeysFromObject(updatedData);
            yield this.brandRepository.update({ id }, Object.assign({}, queryData));
            return null;
        });
    }
    removeEmptyKeysFromObject(object) {
        const keys = Object.keys(object);
        const strippedObject = {};
        keys.map(key => {
            if (object[key]) {
                strippedObject[key] = object[key];
            }
        });
        return strippedObject;
    }
}
exports.BrandService = BrandService;
