import { AffiliateService } from "@app/affiliate/affiliate.service"
import { AffiliateRequestData } from "@app/affiliate/affiliate.type"


export class AffiliateAPIService {
    private affiliateService = new AffiliateService()

    async addAffiliate(requestData:AffiliateRequestData) {
        const affiliate = await this.affiliateService.addAffliate(requestData)
        return affiliate
    }
}