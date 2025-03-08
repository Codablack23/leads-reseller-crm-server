import { body } from "express-validator";


export class ApivValidations{
    static addLeadValidation = [
        body("email").escape()
        .isEmail().withMessage("Please provide a valid email"),
        body("firstname").escape()
        .notEmpty().withMessage("Please provide an firstname"),
        body("lastname").escape()
        .notEmpty().withMessage("Please provide lead lastname"),
        body("country").optional()
        .notEmpty().withMessage("Please provide a country for your lead"),
        body("phone").optional()
        .notEmpty().withMessage("Please provide a lead phone number"),
        body("phone").optional()
        .notEmpty().withMessage("Please provide a campaign"),
    ]
}