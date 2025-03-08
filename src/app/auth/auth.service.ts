import { BadRequest, UnAuthorizedError } from "@core/core.error";
import { LoginRequest, SignUpRequest } from "./auth.types";
import { Request } from "express";
import { AppDataSource } from "@core/core.db";
import bcrypt from "bcrypt";
import {  UserSessionData } from "@interfaces/index";
import { v4 } from "uuid";
import { UserEntity } from "@common/entities/user.entity";



export class AuthService{
    private userRepository = AppDataSource.getRepository(UserEntity)
    getAuthStatus(request:Request){
        const user = request.session.user;
        if(!user){
            throw new UnAuthorizedError("Sorry you are not logged in")
        }
        return user
    }
    logOut(request:Request){
        delete request.session.user;
        return null
    }
    async login(loginRequest:LoginRequest){
        const {email,password:requestPassword} = loginRequest;
        const user = await this.userRepository.findOne({where:{email}})
        const userPassword = user?.password as string
        const isPasswordMatch = await bcrypt.compare(requestPassword,userPassword)

        if(!isPasswordMatch){
            throw new BadRequest("Invalid email or password")
        }
        return {
            email,
            last_signed_in: (new Date()).toISOString(),
            name:user?.name,
            userId:user?.id,
        } as UserSessionData
    }
    async registerUser(signUpRequest:SignUpRequest){
        const password = await bcrypt.hash(signUpRequest.password,await bcrypt.genSalt())
        const userId = v4()

        const newUser =  this.userRepository.create({
            id:userId,
            ...signUpRequest,
            password,
        })

        await this.userRepository.save(newUser)

        return {
            email:signUpRequest.email,
            last_signed_in: (new Date()).toISOString(),
            name:signUpRequest.name,
            userId,
        } as UserSessionData
    }
}
