import { AffiliateService } from "@app/affiliate/affiliate.service"
import { AffiliateRequestData, TrafficRequestData } from "@app/affiliate/affiliate.type"
import { APIKeyEntity } from "@common/entities/apiKey.entity"
import { AppDataSource } from "@core/core.db"


export class AffiliateAPIService {
    private affiliateService = new AffiliateService()
    private apiKeyRepository = AppDataSource.getRepository(APIKeyEntity)

    async addAffiliate(requestData: AffiliateRequestData) {
        const affiliate = await this.affiliateService.addAffliate(requestData)
        return affiliate
    }
    async getAffiliateTraffic(apiKey: string) {

        const { affiliate } = await this.getAffiliateFromAPIKey(apiKey)
        const traffic = await this.affiliateService.getAffiliatesTraffic(affiliate?.id ?? "")
        return traffic
    }
    async addAffiliateTraffic(apiKey: string,trafficData:Omit<TrafficRequestData,"brand">) {
        const { affiliate } = await this.getAffiliateFromAPIKey(apiKey)
        const traffic = await this.affiliateService.addAffliateApiTraffic(affiliate?.id ?? "",trafficData)
        return traffic
    }
    private async getAffiliateFromAPIKey(apiKey: string) {
        const apiKeyRes = await this.apiKeyRepository.findOne({
            where: { id: apiKey },
            relations: ["affiliate", "brand"],
        });

        return {
            affiliate: apiKeyRes?.affiliate,
            brand: apiKeyRes?.brand,
        };
    }
}