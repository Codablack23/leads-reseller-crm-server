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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_response_1 = __importDefault(require("../services/service.response"));
const express_validator_1 = require("express-validator");
const useValidation = (validations) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        for (let validation of validations) {
            const result = yield validation.run(req);
            if (result.context.errors.length)
                break;
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            return next();
        }
        const validationErrors = {};
        errors.array().forEach((error) => {
            validationErrors[error.path] = error.msg;
        });
        const message = errors.array().map(err => err.msg).join(", ");
        return service_response_1.default.sendBadRequestResponse(res, validationErrors, message);
    });
};
exports.default = useValidation;
