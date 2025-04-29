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
exports.AuthService = void 0;
const core_error_1 = require("../../core/core.error");
const core_db_1 = require("../../core/core.db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_entity_1 = require("../../common/entities/user.entity");
class AuthService {
    constructor() {
        this.userRepository = core_db_1.AppDataSource.getRepository(user_entity_1.UserEntity);
    }
    getAuthStatus(request) {
        const user = request.session.user;
        if (!user) {
            throw new core_error_1.UnAuthorizedError("Sorry you are not logged in");
        }
        return user;
    }
    logOut(request) {
        delete request.session.user;
        return null;
    }
    login(loginRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password: requestPassword } = loginRequest;
            const user = yield this.userRepository.findOne({ where: { email } });
            const userPassword = user === null || user === void 0 ? void 0 : user.password;
            const isPasswordMatch = yield bcrypt_1.default.compare(requestPassword, userPassword);
            if (!isPasswordMatch) {
                throw new core_error_1.BadRequest("Invalid email or password");
            }
            return {
                email,
                last_signed_in: (new Date()).toISOString(),
                name: user === null || user === void 0 ? void 0 : user.name,
                userId: user === null || user === void 0 ? void 0 : user.id,
            };
        });
    }
    registerUser(signUpRequest, registrationRelation) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield bcrypt_1.default.hash(signUpRequest.password, yield bcrypt_1.default.genSalt());
            const newUser = this.userRepository.create(Object.assign(Object.assign({}, signUpRequest), { password, affiliate: registrationRelation === null || registrationRelation === void 0 ? void 0 : registrationRelation.affiliate, brand: registrationRelation === null || registrationRelation === void 0 ? void 0 : registrationRelation.brand }));
            yield this.userRepository.save(newUser);
            return {
                email: signUpRequest.email,
                last_signed_in: (new Date()).toISOString(),
                name: signUpRequest.name,
                userId: newUser.id,
            };
        });
    }
}
exports.AuthService = AuthService;
