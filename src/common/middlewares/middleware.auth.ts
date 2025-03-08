import { UserEntity } from "@common/entities/user.entity";
import { AppDataSource } from "@core/core.db";
import { UnAuthorizedError } from "@core/core.error";
import { RequestHandler } from "express";

const userRepository = AppDataSource.getRepository(UserEntity)
export const useAuth:RequestHandler = async(req,res,next) => {
    try {
        const user = req.session.user
        if(!user) {
            throw new UnAuthorizedError("Sorry you are not logged in");
        }
        const userData = await userRepository.findOneBy({id: user.userId})
        if(!userData) {
            delete req.session.user
            throw new UnAuthorizedError("Sorry you are not logged in");
        }
        next()
    } catch (error) {
        next(error);
    }
}
export const useVendorAuth:RequestHandler = async(req,res,next) => {
    try {
        const user = req.session.user
        if(!user) {
            throw new UnAuthorizedError("Sorry you are not logged in");
        }
        const userData = await userRepository.findOneBy({id: user.userId})
        if(!userData) {
            delete req.session.user
            throw new UnAuthorizedError("Sorry you are not logged in");
        }
        next()
    } catch (error) {
        next(error);
    }
}

