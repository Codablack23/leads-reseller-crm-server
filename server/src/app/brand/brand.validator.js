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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandValidator = void 0;
const brand_entity_1 = require("../../common/entities/brand.entity");
const core_db_1 = require("../../core/core.db");
const express_validator_1 = require("express-validator");
const brandRepository = core_db_1.AppDataSource.getRepository(brand_entity_1.BrandEntity);
class BrandValidator {
}
exports.BrandValidator = BrandValidator;
_a = BrandValidator;
BrandValidator.createBrandSchema = [
    (0, express_validator_1.body)("email").escape()
        .isEmail().withMessage("Please provide a valid email"),
    (0, express_validator_1.body)("name").escape()
        .notEmpty().withMessage("Please provide an brand name"),
];
BrandValidator.updateBrandSchema = [
    (0, express_validator_1.param)("id").custom((id) => __awaiter(void 0, void 0, void 0, function* () {
        const brandExist = yield brandRepository.findOne({ where: { id } });
        if (!brandExist) {
            throw new Error("Brand does not exist");
        }
    })),
    (0, express_validator_1.body)("name").optional().escape()
        .notEmpty().withMessage("Please provide an brand name"),
    (0, express_validator_1.body)("email").optional().escape()
        .isEmail().withMessage("Please provide a valid email"),
];
