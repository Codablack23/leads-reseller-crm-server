import { body } from "express-validator";


export class ApivValidations {
    static addLeadValidation = [
        body("email").escape()
            .isEmail().withMessage("Please provide a valid email"),
        body("firstname").escape()
            .notEmpty().withMessage("Please provide an firstname"),
        body("lastname").escape()
            .notEmpty().withMessage("Please provide lead lastname"),
        body("country").escape()
            .notEmpty().withMessage("Please provide a country for your lead"),
        body("phone")
            .notEmpty().withMessage("Please provide a lead phone number"),
        body("campaign").optional()
            .notEmpty().withMessage("Please provide a campaign"),
        body("type").optional()
            .notEmpty().withMessage("Please provide a campaign"),
        body("status").optional()
            .notEmpty().withMessage("Please provide a campaign"),
        body("call_status").optional()
            .notEmpty().withMessage("Please provide a campaign"),
    ]

    static updateLeadStatusValidation = [
        body("lead_update")
            .isArray({ min: 1 })
            .withMessage("lead_update must be a non-empty array"),

        body("lead_update.*.lead_id")
            .notEmpty()
            .withMessage("Each item in lead_update must include lead_id"),

        body("lead_update.*.status")
            .optional()
            .notEmpty()
            .withMessage("status cannot be empty if provided"),

        body("lead_update.*.call_status")
            .optional()
            .notEmpty()
            .withMessage("call_status cannot be empty if provided"),

        body("lead_update").custom((updates) => {
            for (const item of updates) {
                if (!item.status && !item.call_status) {
                    throw new Error("Each item must include at least one of status or call_status");
                }
            }
            return true;
        }),
    ];

    static updateLeadFtdStatusValidation = [
    body("lead_update")
      .isArray({ min: 1 })
      .withMessage("lead_update must be a non-empty array"),

    body("lead_update.*.lead_id")
      .notEmpty()
      .withMessage("Each item in lead_update must include lead_id"),

    body("lead_update.*.ftd_status")
      .notEmpty()
      .withMessage("Each item in lead_update must include ftd_status"),
    body("lead_update.*.ftd_date")
      .notEmpty()
      .withMessage("Each item in lead_update must include ftd_date")
      .isISO8601().withMessage("Please provide an ISO8601 date Eg 2022-09-07")
      ,
  ];
}