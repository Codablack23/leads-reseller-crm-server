import { AppDataSource } from "@core/core.db"
import { AffiliateEntity } from '../../common/entities/affiliate.entity';
import { NotFoundError } from "@core/core.error";
import { AffiliateRequestData, AffiliateUpdateRequestData, Data, TrafficRequestData, TrafficUpdateRequestData } from "./affiliate.type";
import { AuthService } from "@app/auth/auth.service";
import { AFFILIATE_DEFAULT_PASSWORD } from "@core/core.secrets";
import { APIKeyService } from "@app/apiKeys/apiKey.service";
import { TrafficEntity } from "@common/entities/traffic.entity";

export class AffiliateService {
    private affiliateRepository = AppDataSource.getRepository(AffiliateEntity)
    private trafficRepository = AppDataSource.getRepository(TrafficEntity)
    private authService = new AuthService()
    private apiKeyService = new APIKeyService()

    async getAffiliates() {
        const affiliates = await this.affiliateRepository.find({
            relations:{
                traffic:true
            }
        })
        return affiliates
    }

    async getAffiliate(id: string) {
        const affiliate = await this.affiliateRepository.findOne({ where: { id } })
        if (!affiliate) throw new NotFoundError("Affiliate does not exist")
        return affiliate
    }
    async getAffiliatesTraffic(affiliateId:string) {
        const affiliates = await this.trafficRepository.find({
            where: {
                affiliate:{
                    id:affiliateId
                }
             },
             relations:{
                affiliate:true
             }
        })
        return affiliates
    }

    async getAffiliateTrafficDetails(id: string) {
        const traffic = await this.trafficRepository.findOne({ where: { id } })
        if (!traffic) throw new NotFoundError("Traffic does not exist")
        return traffic
    }

    async addAffliate(affiliateData: AffiliateRequestData) {
        const affiliateInstance = this.affiliateRepository.create({
            ...affiliateData,
        })

        const newAffiliate = await this.affiliateRepository.save(affiliateInstance)
        const user = await this.authService.registerUser({
            email: `${affiliateData.email}`,
            password: `${AFFILIATE_DEFAULT_PASSWORD}`,
            name: affiliateData.name || affiliateData.affiliateId,
        },{
            affiliate:newAffiliate,
        })
        const apiKey = await this.apiKeyService.generatePushApiKey(newAffiliate.id)
        return {
            ...affiliateData,
            ...user,
            ...apiKey,
            id: newAffiliate.id
        }
    }
    async addAffliateTraffic(affiliateId:string,trafficData: TrafficRequestData) {

        const trafficInstance = this.trafficRepository.create({
            ...trafficData,
            brand:{
                id:trafficData.brandId
            },
            affiliate:{
                id:affiliateId
            }
        })

        const newTraffic = await this.trafficRepository.save(trafficInstance)
        return newTraffic;
    }

    async deleteAffiliate(id: string) {
        await this.affiliateRepository.delete({ id })
        return { id }
    }
    async deleteAffiliateTraffic(id: string) {
        await this.trafficRepository.delete({ id })
        return { id }
    }

    async updateAffiliate(id: string, updatedData: AffiliateUpdateRequestData) {
        const queryData = this.removeEmptyKeysFromObject(updatedData)
        await this.affiliateRepository.update({ id }, { ...queryData })
        return null
    }

    async updateAffiliateTraffic(id: string, updatedData: TrafficUpdateRequestData) {
        const queryData = this.removeEmptyKeysFromObject(updatedData)
        await this.affiliateRepository.update({ id }, { ...queryData })
        return null
    }

    private removeEmptyKeysFromObject(object: Data) {
        const keys = Object.keys(object)
        const strippedObject: Data = {}

        keys.map(key => {
            if (object[key]) {
                strippedObject[key] = object[key]
            }
        })

        return strippedObject
    }
}