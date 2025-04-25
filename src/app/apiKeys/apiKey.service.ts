import { AppDataSource } from "@core/core.db";
import { API_KEY_STATUS, APIKeyRequestData } from "./apiKey.type";
import { APIKeyEntity } from "@common/entities/apiKey.entity";
import {DateTime} from "luxon";
import { AffiliateEntity } from "@common/entities/affiliate.entity";
import { NotFoundError } from "@core/core.error";
import { BrandEntity } from "@common/entities/brand.entity";


export class APIKeyService{

    private apiKeyRepository = AppDataSource.getRepository(APIKeyEntity)
    private affiliateRepository = AppDataSource.getRepository(AffiliateEntity)
    private brandRepository = AppDataSource.getRepository(BrandEntity)

    async getKeys(){
        return await this.apiKeyRepository.find({relations:["affiliate","brand"]});
    }

    async generatePushApiKey(affiliateId:string){

        const affiliate = await this.affiliateRepository.findOne({where: {id:affiliateId}})

        if(!affiliate){
            throw new NotFoundError ("Affiliate does not exist");
        }

        const expiresAt = DateTime.now().plus({days:30}).toJSDate()

        /**------------------- REVOKES PREVIOUS API KEYS --------------------------- */
        await this.apiKeyRepository.update({affiliate},{
            status:API_KEY_STATUS.REVOKED
        })

        const apiKeyInstance = this.apiKeyRepository.create({
            expiresAt,
            affiliate,
        })

        await this.apiKeyRepository.save(apiKeyInstance)

        return {
            apiKey:apiKeyInstance.id,
        }
    }
    async generatePullApiKey(brandId: string) {


        const brand = await this.brandRepository.findOne({ where: { id: brandId } })

        if (!brand) {
            throw new NotFoundError("Brand does not exist");
        }

        const expiresAt = DateTime.now().plus({ days: 30 }).toJSDate()

        /**------------------- REVOKES PREVIOUS API KEYS --------------------------- */
        await this.apiKeyRepository.update({ brand }, {
            status: API_KEY_STATUS.REVOKED
        })

        const apiKeyInstance = this.apiKeyRepository.create({
            expiresAt,
            brand,
        })

        await this.apiKeyRepository.save(apiKeyInstance)

        return {
            apiKey: apiKeyInstance.id,
        }
    }

    async deleteKey(id:string){
        await this.apiKeyRepository.delete({id})
        return {id}
    }

    async revokeKey(id:string){
        await this.apiKeyRepository.update({id},{
            status: API_KEY_STATUS.REVOKED,
        })
        return null
    }
}