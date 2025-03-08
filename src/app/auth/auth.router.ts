import { Router } from "express";
import AuthController from "./auth.controller";
import useValidation from "@common/middlewares/middleware.validate";
import { AuthValidator } from "./auth.validator";

const authRouter = Router()
authRouter.get("/",AuthController.getAuthStatus)
authRouter.get("/profile",AuthController.getAuthStatus)
authRouter.post("/login",useValidation(AuthValidator.loginSchema),AuthController.login)
authRouter.post("/register",useValidation(AuthValidator.registerSchema),AuthController.register)
authRouter.post("/logout",AuthController.logOut)

export default {
    routeGroup: "/auth",
    routeHandler: authRouter,
}