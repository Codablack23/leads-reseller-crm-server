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
exports.useVendorAuth = exports.useAuth = void 0;
const user_entity_1 = require("../entities/user.entity");
const core_db_1 = require("../../core/core.db");
const core_error_1 = require("../../core/core.error");
const userRepository = core_db_1.AppDataSource.getRepository(user_entity_1.UserEntity);
const useAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.session.user;
        if (!user) {
            throw new core_error_1.UnAuthorizedError("Sorry you are not logged in");
        }
        const userData = yield userRepository.findOneBy({ id: user.userId });
        if (!userData) {
            delete req.session.user;
            throw new core_error_1.UnAuthorizedError("Sorry you are not logged in");
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.useAuth = useAuth;
const useVendorAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.session.user;
        if (!user) {
            throw new core_error_1.UnAuthorizedError("Sorry you are not logged in");
        }
        const userData = yield userRepository.findOneBy({ id: user.userId });
        if (!userData) {
            delete req.session.user;
            throw new core_error_1.UnAuthorizedError("Sorry you are not logged in");
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.useVendorAuth = useVendorAuth;
