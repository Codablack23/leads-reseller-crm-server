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
const brand_entity_1 = require("../../common/entities/brand.entity");
const traffic_entity_1 = require("../../common/entities/traffic.entity");
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
const brandRepository = core_db_1.AppDataSource.getRepository(brand_entity_1.BrandEntity);
const trafficRepository = core_db_1.AppDataSource.getRepository(traffic_entity_1.TrafficEntity);
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
    (0, express_validator_1.body)("email").escape()
        .isEmail().withMessage("Please provide a valid email"),
    (0, express_validator_1.body)("name").optional().escape()
        .notEmpty().withMessage("Please provide an affiliate name"),
    // body("country")
    // .notEmpty().withMessage("Please provide a country for your affiliate"),
    // body("openingTime")
    // .notEmpty().withMessage("Please provide a starting time for your traffic"),
    // body("closingTime")
    // .notEmpty().withMessage("Please provide a closing time for traffic"),
    // body("trafficDays")
    // .notEmpty().withMessage("Please provide traffic days for your affiliate")
];
AffiliateValidator.createTrafficSchema = [
    (0, express_validator_1.param)("id").custom((id) => __awaiter(void 0, void 0, void 0, function* () {
        const affiliateExists = yield affiliateRepository.findOne({ where: { id } });
        if (!affiliateExists) {
            throw new Error("Affiliate does not exist");
        }
    })),
    (0, express_validator_1.body)("brandId").escape()
        .notEmpty().withMessage("please provide a brand ID")
        .custom((brandId) => __awaiter(void 0, void 0, void 0, function* () {
        const existingBrand = yield brandRepository.findOne({
            where: {
                id: brandId
            }
        });
        if (!existingBrand) {
            throw new Error("Brand does not exist");
        }
    })),
    (0, express_validator_1.body)("country")
        .notEmpty().withMessage("Please provide a country for your affiliate"),
    (0, express_validator_1.body)("openingTime")
        .notEmpty().withMessage("Please provide a starting time for your traffic"),
    (0, express_validator_1.body)("closingTime")
        .notEmpty().withMessage("Please provide a closing time for traffic"),
    (0, express_validator_1.body)("trafficDays")
        .notEmpty().withMessage("Please provide traffic days for your affiliate"),
    (0, express_validator_1.body)("weight")
        .notEmpty()
        .withMessage("Please provide a weight for your traffic")
        .isNumeric().withMessage("Weight should only contain numbers"),
    (0, express_validator_1.body)("priority")
        .notEmpty().withMessage("Please priority for your traffic")
        .isNumeric().withMessage("Priority should only contain numbers"),
    (0, express_validator_1.body)("dailyCap")
        .notEmpty().withMessage("Please provide a daily cap for traffic")
        .isNumeric().withMessage("Daily cap should only contain numbers"),
    (0, express_validator_1.body)("skipFallback")
        .notEmpty().withMessage("Please provide skip fallback for your traffic")
];
AffiliateValidator.updateTrafficSchema = [
    (0, express_validator_1.param)("id").custom((id) => __awaiter(void 0, void 0, void 0, function* () {
        const trafficExists = yield trafficRepository.findOne({ where: { id } });
        if (!trafficExists) {
            throw new Error("Traffic does not exist");
        }
    })),
    (0, express_validator_1.body)("country")
        .optional()
        .notEmpty().withMessage("Please provide a country for your affiliate"),
    (0, express_validator_1.body)("openingTime")
        .optional()
        .notEmpty().withMessage("Please provide a starting time for your traffic"),
    (0, express_validator_1.body)("closingTime")
        .optional()
        .notEmpty().withMessage("Please provide a closing time for traffic"),
    (0, express_validator_1.body)("trafficDays")
        .optional()
        .notEmpty().withMessage("Please provide traffic days for your affiliate"),
    (0, express_validator_1.body)("weight")
        .optional()
        .notEmpty()
        .withMessage("Please provide a weight for your traffic")
        .isNumeric().withMessage("Weight should only contain numbers"),
    (0, express_validator_1.body)("priority")
        .optional()
        .notEmpty().withMessage("Please priority for your traffic")
        .isNumeric().withMessage("Priority should only contain numbers"),
    (0, express_validator_1.body)("dailyCap")
        .optional()
        .notEmpty().withMessage("Please provide a daily cap for traffic")
        .isNumeric().withMessage("Daily cap should only contain numbers"),
    (0, express_validator_1.body)("skipFallback")
        .optional()
        .notEmpty().withMessage("Please provide skip fallback for your traffic")
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
