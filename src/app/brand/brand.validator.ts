import { BrandEntity } from "@common/entities/brand.entity";
import { AppDataSource } from "@core/core.db";
import { body, param, ValidationChain } from "express-validator";

const brandRepository =  AppDataSource.getRepository(BrandEntity);

export class BrandValidator{
    static createBrandSchema:ValidationChain[] = [
        body("email").escape()
        .isEmail().withMessage("Please provide a valid email"),
        body("name").escape()
        .notEmpty().withMessage("Please provide an brand name"),
    ]
    static updateBrandSchema:ValidationChain[] = [
        param("id").custom(async(id:string)=>{
            const brandExist = await brandRepository.findOne({where:{id}})
            if(!brandExist){
                throw new Error("Brand does not exist");
            }
        }),
        body("name").optional().escape()
        .notEmpty().withMessage("Please provide an brand name"),
        body("email").optional().escape()
        .isEmail().withMessage("Please provide a valid email"),
    ]
}