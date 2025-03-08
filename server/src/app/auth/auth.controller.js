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
const service_response_1 = __importDefault(require("../../common/services/service.response"));
const auth_service_1 = require("./auth.service");
class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.authService.login(req.body);
                req.session.user = user;
                service_response_1.default.sendOkResponse(res, { user }, "Login successful");
            }
            catch (error) {
                next(error);
            }
        });
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.authService.registerUser(req.body);
                req.session.user = user;
                service_response_1.default.sendOkResponse(res, { user }, "Registration successful");
            }
            catch (error) {
                next(error);
            }
        });
        this.getAuthStatus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = this.authService.getAuthStatus(req);
                service_response_1.default.sendOkResponse(res, { profile }, "Profile retrieved successfully");
            }
            catch (error) {
                next(error);
            }
        });
        this.logOut = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.authService.logOut(req);
                service_response_1.default.sendOkResponse(res, null, "Logout successful");
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AuthController(new auth_service_1.AuthService());
