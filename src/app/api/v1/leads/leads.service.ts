import { APIKeyEntity } from "@common/entities/apiKey.entity"
import { AppDataSource } from "@core/core.db"
import { LeadRequestData } from "../data"
import { TrafficEntity } from "@common/entities/traffic.entity"
import { LeadEntity } from "@common/entities/lead.entity"
// import { UnAuthorizedError } from "@core/core.error"

export class LeadsAPIService {
    private trafficRepository = AppDataSource.getRepository(TrafficEntity)
    private leadRepository = AppDataSource.getRepository(LeadEntity)
    private apiKeyRepository = AppDataSource.getRepository(APIKeyEntity)


    async getUserLeads(apiKey: string) {
        const { affiliate, brand } = await this.getAffiliateFromAPIKey(apiKey)

        if (affiliate) {
            const leads = this.leadRepository.find({
                where:{ traffic:{ affiliate } }
            })

            return leads
        }
        const leads = this.leadRepository.find({
            where:{ traffic:{ brand } }
        })

        return leads

    }
    async addLead(apiKey: string, leadData: LeadRequestData) {
        const { affiliate } = await this.getAffiliateFromAPIKey(apiKey)
        const traffic = await this.trafficRepository.find({
            where:{
                country:leadData.country
            }
        })

        return {}
    }

    private async getAffiliateFromAPIKey(apiKey: string) {
        const apiKeyRes = await this.apiKeyRepository.findOne({
            where: {
                id: apiKey
            },
            relations: ["affiliate", "brand"]
        })

        const affiliate = apiKeyRes?.affiliate
        const brand = apiKeyRes?.brand

        return { affiliate, brand }
    }
}