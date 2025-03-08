import { AffiliateEntity } from "@common/entities/affiliate.entity";
import { AppDataSource } from "@core/core.db";
import { body, param, ValidationChain } from "express-validator";

// export interface AffiliateRequestData {
//     affiliateId:string,
//     name? :string,
//     email? :string,
//     country:string,
//     openingTime:string,
//     closingTime:string,
//     trafficDays:string
// }

const affiliateRepository =  AppDataSource.getRepository(AffiliateEntity);

export class AffiliateValidator{
    static createAffiliateSchema:ValidationChain[] = [
        body("affiliateId").escape()
        .notEmpty().withMessage("please provide an affiliate ID")
        .isAlphanumeric().withMessage("Please provide only alpha-numeric ID")
        .isLength({min:2}).withMessage("Please provide atleast 2 characters for affiliate ID")
        .custom(async(affiliateId:string)=>{
            const existingAffiliates = await affiliateRepository.findOne({
                where: {
                    affiliateId
                }
            })
            if(existingAffiliates){
                throw new Error("Please provide a unique affiliate ID");
            }
        }),
        body("email").optional().escape()
        .isEmail().withMessage("Please provide a valid email"),
        body("name").optional().escape()
        .notEmpty().withMessage("Please provide an affiliate name"),
        body("country")
        .notEmpty().withMessage("Please provide a country for your affiliate"),
        body("openingTime")
        .notEmpty().withMessage("Please provide a starting time for your traffic"),
        body("closingTime")
        .notEmpty().withMessage("Please provide a closing time for traffic"),
        body("trafficDays")
        .notEmpty().withMessage("Please provide traffic days for your affiliate")

    ]
    static updateAffiliateSchema:ValidationChain[] = [
        param("id").custom(async(id:string)=>{
            const affiliateExists = await affiliateRepository.findOne({where:{id}})
            if(!affiliateExists){
                throw new Error("Affiliate does not exist");
            }
        }),
        body("affiliateId")
        .optional()
        .escape()
        .notEmpty().withMessage("please provide an affiliate ID")
        .isAlphanumeric().withMessage("Please provide only alpha-numeric ID")
        .isLength({min:2}).withMessage("Please provide atleast 2 characters for affiliate ID")
        .custom(async(affiliateId:string)=>{
            const existingAffiliates = await affiliateRepository.findOne({
                where: {
                    affiliateId
                }
            })
            if(existingAffiliates){
                throw new Error("Please provide a unique affiliate ID");
            }
        }),
        body("email").optional().escape()
        .isEmail().withMessage("Please provide a valid email"),
    ]
}