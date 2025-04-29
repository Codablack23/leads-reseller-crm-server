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
exports.AuthValidator = void 0;
const user_entity_1 = require("../../common/entities/user.entity");
const core_db_1 = require("../../core/core.db");
const express_validator_1 = require("express-validator");
const userRepository = core_db_1.AppDataSource.getRepository(user_entity_1.UserEntity);
class AuthValidator {
}
exports.AuthValidator = AuthValidator;
_a = AuthValidator;
AuthValidator.loginSchema = [
    (0, express_validator_1.body)("email")
        .notEmpty().withMessage("Please provide an email")
        .isEmail().withMessage("Please provide a valid email")
        .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield userRepository.findOne({ where: { email } });
        if (!existingUser) {
            throw new Error('User does not exist');
        }
    })),
    (0, express_validator_1.body)("password")
        .notEmpty().withMessage("Please provide your password")
        .isLength({ min: 8 }).withMessage("please provide a password with atleast 8 characters long")
];
AuthValidator.registerSchema = [
    (0, express_validator_1.body)("email")
        .notEmpty().withMessage("Please provide an email")
        .isEmail().withMessage("Please provide a valid email")
        .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('E-mail already in use');
        }
    })),
    (0, express_validator_1.body)("name")
        .notEmpty().withMessage("Please provide your name")
        .isLength({ min: 3 }).withMessage("Name should be atleast 3 characters long")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        if (!value)
            throw new Error("Please provide your name");
        const names = value.split(" ");
        if (names.length == 1) {
            throw new Error("Please provide your full name eg Surname Firstname Othernames(optional");
        }
        if (!names.every(name => name.length >= 3)) {
            throw new Error("Each name should atleast be 3 characters long");
        }
        if (!names.every(name => name.match(/([a-zA-Z])/g))) {
            throw new Error("Each name should be an alphabet");
        }
    })),
    (0, express_validator_1.body)("password")
        .notEmpty().withMessage("Please provide your password")
        .isLength({ min: 8 }).withMessage("please provide a password with atleast 8 characters long")
];
AuthValidator.registerBrandSchema = [
    (0, express_validator_1.body)("email")
        .notEmpty().withMessage("Please provide an email")
        .isEmail().withMessage("Please provide a valid email")
        .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('E-mail already in use');
        }
    })),
    (0, express_validator_1.body)("name")
        .notEmpty().withMessage("Please provide your name")
        .isLength({ min: 3 }).withMessage("Name should be atleast 3 characters long")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        if (!value)
            throw new Error("Please provide your name");
        const names = value.split(" ");
        if (names.length == 1) {
            throw new Error("Please provide your full name eg Surname Firstname Othernames(optional");
        }
        if (!names.every(name => name.length >= 3)) {
            throw new Error("Each name should atleast be 3 characters long");
        }
        if (!names.every(name => name.match(/([a-zA-Z])/g))) {
            throw new Error("Each name should be an alphabet");
        }
    })),
];
AuthValidator.registerAffiliateSchema = [
    (0, express_validator_1.body)("email")
        .notEmpty().withMessage("Please provide an email")
        .isEmail().withMessage("Please provide a valid email")
        .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('E-mail already in use');
        }
    })),
    (0, express_validator_1.body)("name")
        .notEmpty().withMessage("Please provide your name")
        .isLength({ min: 3 }).withMessage("Name should be atleast 3 characters long")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        if (!value)
            throw new Error("Please provide your name");
        const names = value.split(" ");
        if (names.length == 1) {
            throw new Error("Please provide your full name eg Surname Firstname Othernames(optional");
        }
        if (!names.every(name => name.length >= 3)) {
            throw new Error("Each name should atleast be 3 characters long");
        }
        if (!names.every(name => name.match(/([a-zA-Z])/g))) {
            throw new Error("Each name should be an alphabet");
        }
    }))
];
