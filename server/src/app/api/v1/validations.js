"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApivValidations = void 0;
const express_validator_1 = require("express-validator");
class ApivValidations {
}
exports.ApivValidations = ApivValidations;
ApivValidations.addLeadValidation = [
    (0, express_validator_1.body)("email").escape()
        .isEmail().withMessage("Please provide a valid email"),
    (0, express_validator_1.body)("firstname").escape()
        .notEmpty().withMessage("Please provide an firstname"),
    (0, express_validator_1.body)("lastname").escape()
        .notEmpty().withMessage("Please provide lead lastname"),
    (0, express_validator_1.body)("country").escape()
        .notEmpty().withMessage("Please provide a country for your lead"),
    (0, express_validator_1.body)("phone")
        .notEmpty().withMessage("Please provide a lead phone number"),
    (0, express_validator_1.body)("campaign").optional()
        .notEmpty().withMessage("Please provide a campaign"),
    (0, express_validator_1.body)("type").optional()
        .notEmpty().withMessage("Please provide a campaign"),
    (0, express_validator_1.body)("status").optional()
        .notEmpty().withMessage("Please provide a campaign"),
    (0, express_validator_1.body)("call_status").optional()
        .notEmpty().withMessage("Please provide a campaign"),
];
ApivValidations.updateLeadStatusValidation = [
    (0, express_validator_1.body)("lead_update")
        .isArray({ min: 1 })
        .withMessage("lead_update must be a non-empty array"),
    (0, express_validator_1.body)("lead_update.*.lead_id")
        .notEmpty()
        .withMessage("Each item in lead_update must include lead_id"),
    (0, express_validator_1.body)("lead_update.*.status")
        .optional()
        .notEmpty()
        .withMessage("status cannot be empty if provided"),
    (0, express_validator_1.body)("lead_update.*.call_status")
        .optional()
        .notEmpty()
        .withMessage("call_status cannot be empty if provided"),
    (0, express_validator_1.body)("lead_update").custom((updates) => {
        for (const item of updates) {
            if (!item.status && !item.call_status) {
                throw new Error("Each item must include at least one of status or call_status");
            }
        }
        return true;
    }),
];
ApivValidations.updateLeadFtdStatusValidation = [
    (0, express_validator_1.body)("lead_update")
        .isArray({ min: 1 })
        .withMessage("lead_update must be a non-empty array"),
    (0, express_validator_1.body)("lead_update.*.lead_id")
        .notEmpty()
        .withMessage("Each item in lead_update must include lead_id"),
    (0, express_validator_1.body)("lead_update.*.ftd_status")
        .notEmpty()
        .withMessage("Each item in lead_update must include ftd_status"),
    (0, express_validator_1.body)("lead_update.*.ftd_date")
        .notEmpty()
        .withMessage("Each item in lead_update must include ftd_date")
        .isISO8601().withMessage("Please provide an ISO8601 date Eg 2022-09-07"),
];
