import AppResponse from '@common/services/service.response';
import { AuthService } from './auth.service';
import { RequestHandler } from "express";

class AuthController {
    constructor(private authService: AuthService){}

    login: RequestHandler = async (req, res, next) => {
        try {
            const user = await this.authService.login(req.body)
            req.session.user = user
            AppResponse.sendOkResponse(res,{user},"Login successful")
        } catch (error) {
            next(error);
        }
    }
    register: RequestHandler = async (req, res, next) => {
        try {
            const user = await this.authService.registerUser(req.body)
            req.session.user = user

            AppResponse.sendOkResponse(res,{user},"Registration successful")
        } catch (error) {
            next(error);
        }
    }
    getAuthStatus: RequestHandler = async (req, res, next) => {
        try {
            const profile = this.authService.getAuthStatus(req)
            AppResponse.sendOkResponse(res,{profile},"Profile retrieved successfully")
        } catch (error) {
            next(error);
        }
    }
    logOut: RequestHandler = async (req, res, next) => {
        try {
            this.authService.logOut(req)
            AppResponse.sendOkResponse(res,null,"Logout successful")
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController(new AuthService()) as AuthController