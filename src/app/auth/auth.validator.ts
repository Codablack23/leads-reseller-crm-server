import { UserEntity } from "@common/entities/user.entity";
import { AppDataSource } from "@core/core.db";
import { body, ValidationChain } from "express-validator";

const userRepository =  AppDataSource.getRepository(UserEntity);

export class AuthValidator{
    static loginSchema:ValidationChain[] = [
        body("email")
        .notEmpty().withMessage("Please provide an email")
        .isEmail().withMessage("Please provide a valid email")
        .custom(async(email:string)=>{
            const existingUser = await userRepository.findOne({ where:{email} });
            if(!existingUser){
                throw new Error('User does not exist');
            }
        })
        ,
        body("password")
        .notEmpty().withMessage("Please provide your password")
        .isLength({min:8}).withMessage("please provide a password with atleast 8 characters long")
    ]
    static registerSchema:ValidationChain[] = [
        body("email")
        .notEmpty().withMessage("Please provide an email")
        .isEmail().withMessage("Please provide a valid email")
        .custom(async(email:string)=>{
            const existingUser = await userRepository.findOne({ where:{email} });
            if(existingUser){
                throw new Error('E-mail already in use');
            }
        })
        ,
        body("name")
        .notEmpty().withMessage("Please provide your name")
        .isLength({min:3}).withMessage("Name should be atleast 3 characters long")
        .custom(async(value:string)=>{
            if(!value) throw new Error("Please provide your name");
            const names = value.split(" ")
            if(names.length  == 1){
                throw new Error("Please provide your full name eg Surname Firstname Othernames(optional")
            }
            if(!names.every(name=>name.length >= 3)){
                throw new Error("Each name should atleast be 3 characters long")
            }
            if(!names.every(name=>name.match(/([a-zA-Z])/g))){
                throw new Error("Each name should be an alphabet")
            }

        }),

        body("password")
        .notEmpty().withMessage("Please provide your password")
        .isLength({min:8}).withMessage("please provide a password with atleast 8 characters long")
    ]
    static registerBrandSchema:ValidationChain[] = [
        body("email")
        .notEmpty().withMessage("Please provide an email")
        .isEmail().withMessage("Please provide a valid email")
        .custom(async(email:string)=>{
            const existingUser = await userRepository.findOne({ where:{email} });
            if(existingUser){
                throw new Error('E-mail already in use');
            }
        })
        ,
        body("name")
        .notEmpty().withMessage("Please provide your name")
        .isLength({min:3}).withMessage("Name should be atleast 3 characters long")
        .custom(async(value:string)=>{
            if(!value) throw new Error("Please provide your name");
            const names = value.split(" ")
            if(names.length  == 1){
                throw new Error("Please provide your full name eg Surname Firstname Othernames(optional")
            }
            if(!names.every(name=>name.length >= 3)){
                throw new Error("Each name should atleast be 3 characters long")
            }
            if(!names.every(name=>name.match(/([a-zA-Z])/g))){
                throw new Error("Each name should be an alphabet")
            }

        }),
    ]
    static registerAffiliateSchema:ValidationChain[] = [
        body("email")
        .notEmpty().withMessage("Please provide an email")
        .isEmail().withMessage("Please provide a valid email")
        .custom(async(email:string)=>{
            const existingUser = await userRepository.findOne({ where:{email} });
            if(existingUser){
                throw new Error('E-mail already in use');
            }
        })
        ,
        body("name")
        .notEmpty().withMessage("Please provide your name")
        .isLength({min:3}).withMessage("Name should be atleast 3 characters long")
        .custom(async(value:string)=>{
            if(!value) throw new Error("Please provide your name");
            const names = value.split(" ")
            if(names.length  == 1){
                throw new Error("Please provide your full name eg Surname Firstname Othernames(optional")
            }
            if(!names.every(name=>name.length >= 3)){
                throw new Error("Each name should atleast be 3 characters long")
            }
            if(!names.every(name=>name.match(/([a-zA-Z])/g))){
                throw new Error("Each name should be an alphabet")
            }

        })
    ]


}