import { AffiliateEntity } from "@common/entities/affiliate.entity";
import { APIKeyEntity } from "@common/entities/apiKey.entity";
import { BrandEntity } from "@common/entities/brand.entity";
import { AppDataSource } from "@core/core.db";
import { body, param, ValidationChain } from "express-validator";

const affiliateRepository =  AppDataSource.getRepository(AffiliateEntity);
const brandRepository =  AppDataSource.getRepository(BrandEntity);
const apiKeyRepository =  AppDataSource.getRepository(APIKeyEntity);

export class APIKeyValidator{
    static createApiKeySchema:ValidationChain[] = [
        body("brandId").if(body("affiliateId").isEmpty())
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
        body("affiliateId").if(body("brandId").isEmpty())
        .custom(async(affiliateId:string)=>{
            console.log(affiliateId);
            const existingAffiliates = await affiliateRepository.findOne({
                where: {
                    id:affiliateId
                }
            })
            if(!existingAffiliates){
                throw new Error("Affiliate does not exist");
            }
        })
    ]
    static revokeApiKeySchema:ValidationChain[] = [
        param("id").custom(async(id:string)=>{
            const apiKeyExists = await apiKeyRepository.findOne({where:{id}})
            if(!apiKeyExists){
                throw new Error("Api key does not exist");
            }
        }),
    ]
}