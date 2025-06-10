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
];
