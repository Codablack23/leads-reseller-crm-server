import AppResponse from "@common/services/service.response";
import { AppValidationError } from "@interfaces/index";
import { RequestHandler } from "express";
import { ValidationChain, ValidationError, validationResult } from "express-validator";

type RequestValidator = (validations: ValidationChain[]) => RequestHandler

const useValidation: RequestValidator = (validations: ValidationChain[]) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (result.context.errors.length) break;
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        const validationErrors:AppValidationError = {}

        errors.array().forEach((error:any) => {
            validationErrors[error.path] = (error as ValidationError).msg;
        })

        const message = errors.array().map(err => err.msg).join(", ")
        return AppResponse.sendBadRequestResponse(res,validationErrors,message)
    };
}

export default useValidation;