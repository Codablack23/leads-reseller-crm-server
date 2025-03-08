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
exports.AffiliateValidator = void 0;
const affiliate_entity_1 = require("../../common/entities/affiliate.entity");
const core_db_1 = require("../../core/core.db");
const express_validator_1 = require("express-validator");
// export interface AffiliateRequestData {
//     affiliateId:string,
//     name? :string,
//     email? :string,
//     country:string,
//     openingTime:string,
//     closingTime:string,
//     trafficDays:string
// }
const affiliateRepository = core_db_1.AppDataSource.getRepository(affiliate_entity_1.AffiliateEntity);
class AffiliateValidator {
}
exports.AffiliateValidator = AffiliateValidator;
_a = AffiliateValidator;
AffiliateValidator.createAffiliateSchema = [
    (0, express_validator_1.body)("affiliateId").escape()
        .notEmpty().withMessage("please provide an affiliate ID")
        .isAlphanumeric().withMessage("Please provide only alpha-numeric ID")
        .isLength({ min: 2 }).withMessage("Please provide atleast 2 characters for affiliate ID")
        .custom((affiliateId) => __awaiter(void 0, void 0, void 0, function* () {
        const existingAffiliates = yield affiliateRepository.findOne({
            where: {
                affiliateId
            }
        });
        if (existingAffiliates) {
            throw new Error("Please provide a unique affiliate ID");
        }
    })),
    (0, express_validator_1.body)("email").optional().escape()
        .isEmail().withMessage("Please provide a valid email"),
    (0, express_validator_1.body)("name").optional().escape()
        .notEmpty().withMessage("Please provide an affiliate name"),
    (0, express_validator_1.body)("country")
        .notEmpty().withMessage("Please provide a country for your affiliate"),
    (0, express_validator_1.body)("openingTime")
        .notEmpty().withMessage("Please provide a starting time for your traffic"),
    (0, express_validator_1.body)("closingTime")
        .notEmpty().withMessage("Please provide a closing time for traffic"),
    (0, express_validator_1.body)("trafficDays")
        .notEmpty().withMessage("Please provide traffic days for your affiliate")
];
AffiliateValidator.updateAffiliateSchema = [
    (0, express_validator_1.param)("id").custom((id) => __awaiter(void 0, void 0, void 0, function* () {
        const affiliateExists = yield affiliateRepository.findOne({ where: { id } });
        if (!affiliateExists) {
            throw new Error("Affiliate does not exist");
        }
    })),
    (0, express_validator_1.body)("affiliateId")
        .optional()
        .escape()
        .notEmpty().withMessage("please provide an affiliate ID")
        .isAlphanumeric().withMessage("Please provide only alpha-numeric ID")
        .isLength({ min: 2 }).withMessage("Please provide atleast 2 characters for affiliate ID")
        .custom((affiliateId) => __awaiter(void 0, void 0, void 0, function* () {
        const existingAffiliates = yield affiliateRepository.findOne({
            where: {
                affiliateId
            }
        });
        if (existingAffiliates) {
            throw new Error("Please provide a unique affiliate ID");
        }
    })),
    (0, express_validator_1.body)("email").optional().escape()
        .isEmail().withMessage("Please provide a valid email"),
];
