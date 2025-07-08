import { AffiliateEntity } from "@common/entities/affiliate.entity";
import { BrandEntity } from "@common/entities/brand.entity";
import { TrafficEntity } from "@common/entities/traffic.entity";
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
const brandRepository =  AppDataSource.getRepository(BrandEntity);
const trafficRepository =  AppDataSource.getRepository(TrafficEntity);

export class AffiliateValidator{

    static addAffiliateSchema:ValidationChain[] = [
        body("email").escape()
        .isEmail().withMessage("Please provide a valid email"),
        body("dailyCap").optional().escape()
        .notEmpty().withMessage("Please add a daily cap for leads"),
        body("country")
        .notEmpty().withMessage("Please provide a country for your affiliate"),
        body("lead_opening_time")
        .notEmpty().withMessage("Please provide a starting time for your traffic"),
        body("lead_closing_time")
        .notEmpty().withMessage("Please provide a closing time for traffic"),
        body("traffic_days")
        .notEmpty().withMessage("Please provide traffic days for your affiliate")
    ]

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
        body("email").escape()
        .isEmail().withMessage("Please provide a valid email"),
        body("name").optional().escape()
        .notEmpty().withMessage("Please provide an affiliate name"),
        // body("country")
        // .notEmpty().withMessage("Please provide a country for your affiliate"),
        // body("openingTime")
        // .notEmpty().withMessage("Please provide a starting time for your traffic"),
        // body("closingTime")
        // .notEmpty().withMessage("Please provide a closing time for traffic"),
        // body("trafficDays")
        // .notEmpty().withMessage("Please provide traffic days for your affiliate")

    ]
    static createTrafficSchema:ValidationChain[] = [
        param("id").custom(async(id:string)=>{
            const affiliateExists = await affiliateRepository.findOne({where:{id}})
            if(!affiliateExists){
                throw new Error("Affiliate does not exist");
            }
        }),
        body("brandId").escape()
        .notEmpty().withMessage("please provide a brand ID")
        .custom(async(brandId:string)=>{
            const existingBrand = await brandRepository.findOne({
                where: {
                    id:brandId
                }
            })
            if(!existingBrand){
                throw new Error("Brand does not exist");
            }
        }),
        body("country")
        .notEmpty().withMessage("Please provide a country for your affiliate"),
        body("openingTime")
        .notEmpty().withMessage("Please provide a starting time for your traffic"),
        body("closingTime")
        .notEmpty().withMessage("Please provide a closing time for traffic"),
        body("trafficDays")
        .notEmpty().withMessage("Please provide traffic days for your affiliate") ,
        body("weight")
        .notEmpty()
        .withMessage("Please provide a weight for your traffic")
        .isNumeric().withMessage("Weight should only contain numbers"),
        body("priority")
        .notEmpty().withMessage("Please priority for your traffic")
        .isNumeric().withMessage("Priority should only contain numbers"),
        body("dailyCap")
        .notEmpty().withMessage("Please provide a daily cap for traffic")
        .isNumeric().withMessage("Daily cap should only contain numbers"),
        body("skipFallback")
        .notEmpty().withMessage("Please provide skip fallback for your traffic")

    ]
    static updateTrafficSchema:ValidationChain[] = [
        param("id").custom(async(id:string)=>{
            const trafficExists = await trafficRepository.findOne({where:{id}})
            if(!trafficExists){
                throw new Error("Traffic does not exist");
            }
        }),
       
        body("country")
        .optional()
        .notEmpty().withMessage("Please provide a country for your affiliate"),
        body("openingTime")
        .optional()
        .notEmpty().withMessage("Please provide a starting time for your traffic"),
        body("closingTime")
        .optional()
        .notEmpty().withMessage("Please provide a closing time for traffic"),
        body("trafficDays")
        .optional()
        .notEmpty().withMessage("Please provide traffic days for your affiliate") ,
        body("weight")
        .optional()
        .notEmpty()
        .withMessage("Please provide a weight for your traffic")
        .isNumeric().withMessage("Weight should only contain numbers"),
        body("priority")
        .optional()
        .notEmpty().withMessage("Please priority for your traffic")
        .isNumeric().withMessage("Priority should only contain numbers"),
        body("dailyCap")
        .optional()
        .notEmpty().withMessage("Please provide a daily cap for traffic")
        .isNumeric().withMessage("Daily cap should only contain numbers"),
        body("skipFallback")
        .optional()
        .notEmpty().withMessage("Please provide skip fallback for your traffic")

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