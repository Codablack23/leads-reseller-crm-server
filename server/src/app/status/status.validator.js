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
exports.StatusMapValidator = void 0;
const brand_entity_1 = require("../../common/entities/brand.entity");
const lead_entity_1 = require("../../common/entities/lead.entity");
const statusList_entity_1 = require("../../common/entities/statusList.entity");
const statusMap_entity_1 = require("../../common/entities/statusMap.entity");
// import { StatusMapType } from '../../common/enums';
const core_db_1 = require("../../core/core.db");
const express_validator_1 = require("express-validator");
class StatusMapValidatorClass {
    constructor() {
        this.statusMapRepository = core_db_1.AppDataSource.getRepository(statusMap_entity_1.StatusMapEntity);
        this.statusListRepository = core_db_1.AppDataSource.getRepository(statusList_entity_1.StatusListEntity);
        this.leadRepository = core_db_1.AppDataSource.getRepository(lead_entity_1.LeadEntity);
        this.brandRepository = core_db_1.AppDataSource.getRepository(brand_entity_1.BrandEntity);
        this.addStatusMapValidator = [
            (0, express_validator_1.body)("status_text")
                .escape()
                .notEmpty().withMessage("Please provide the status you wish to map from")
                .custom((value) => __awaiter(this, void 0, void 0, function* () {
                if (!value)
                    throw new Error("Please provide the status you wish to map from");
                const existingMap = yield this.statusMapRepository.findOne({
                    where: {
                        status_text: value.toLowerCase()
                    }
                });
                if (existingMap)
                    throw new Error("Sorry you have already mapped this status");
            })),
            (0, express_validator_1.body)("status_id")
                .escape()
                .notEmpty().withMessage("Please provide the status you wish to map from")
                .custom((value) => __awaiter(this, void 0, void 0, function* () {
                if (!value)
                    throw new Error("Please provide the status you wish to map from");
                const status = yield this.statusListRepository.findOne({
                    where: {
                        id: value
                    }
                });
                if (!status)
                    throw new Error("Sorry this status does not exist");
            })),
            (0, express_validator_1.body)("lead_id")
                .escape()
                .optional()
                .notEmpty().withMessage("Please provide the lead you wish to map status")
                .custom((value) => __awaiter(this, void 0, void 0, function* () {
                if (!value)
                    throw new Error("Please provide the lead you wish to map status");
                const lead = yield this.leadRepository.findOne({
                    where: {
                        id: value
                    }
                });
                if (!lead)
                    throw new Error("Sorry this lead does not exist");
            })),
            (0, express_validator_1.body)("brand_id")
                .escape()
                .optional()
                .notEmpty().withMessage("Please provide the brand you wish to map status")
                .custom((value) => __awaiter(this, void 0, void 0, function* () {
                if (!value)
                    throw new Error("Please provide the brand you wish to map status");
                const brand = yield this.brandRepository.findOne({
                    where: {
                        id: value
                    }
                });
                if (!brand)
                    throw new Error("Sorry this brand does not exist");
            })),
        ];
        this.addStatusValidator = [
            (0, express_validator_1.body)("name")
                .escape()
                .notEmpty().withMessage("Please provide your status name")
                .custom((value) => __awaiter(this, void 0, void 0, function* () {
                if (!value)
                    throw new Error("Please provide your status name");
                const existingMap = yield this.statusListRepository.findOne({
                    where: {
                        name: value.toLowerCase()
                    }
                });
                if (existingMap)
                    throw new Error("Sorry you have already created this status");
            })),
            (0, express_validator_1.body)("label_theme")
                .escape()
                .optional()
                .notEmpty()
                .withMessage("Please provide the label background color")
                .isHexColor().withMessage("Please provide a valid hex color code for label background color"),
            (0, express_validator_1.body)("label_text_color")
                .escape()
                .optional()
                .notEmpty()
                .isHexColor().withMessage("Please provide a valid hex color code for label text color")
        ];
    }
}
exports.StatusMapValidator = new StatusMapValidatorClass();
