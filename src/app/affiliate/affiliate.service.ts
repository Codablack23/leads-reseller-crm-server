import { AppDataSource } from "@core/core.db"
import { AffiliateEntity } from '../../common/entities/affiliate.entity';
import { NotFoundError } from "@core/core.error";
import { AffiliateRequestData, AffiliateUpdateRequestData, Data } from "./affiliate.type";

export class AffiliateService{
    private affiliateRepository = AppDataSource.getRepository(AffiliateEntity)

    async getAffiliates(){
        const affiliates = await this.affiliateRepository.find()
        return affiliates
    }

    async getAffiliate(id:string){
        const affiliate = await this.affiliateRepository.findOne({where: { id }})
        if(!affiliate) throw new NotFoundError("Affiliate does not exist")
        return affiliate
    }

    async addAffliate(affiliateData:AffiliateRequestData){
        const affiliateInstance = this.affiliateRepository.create({
            ...affiliateData,
        })
        const newAffiliate =  await this.affiliateRepository.save(affiliateInstance)
        return {
            ...affiliateData,
            id:newAffiliate.id
        }
    }

    async deleteAffiliate(id:string){
        await this.affiliateRepository.delete({id})
        return {id}
    }

    async updateAffiliate(id:string,updatedData:AffiliateUpdateRequestData){
        const queryData = this.removeEmptyKeysFromObject(updatedData)
        await this.affiliateRepository.update({id},{...queryData})
        return null
    }

    private removeEmptyKeysFromObject(object:Data){
        const keys = Object.keys(object)
        const strippedObject:Data = {}

        keys.map(key=>{
            if(object[key]){
                strippedObject[key] = object[key]
            }
        })

        return strippedObject
    }
}