import { APIKeyEntity } from "@common/entities/apiKey.entity"
import { LeadEntity } from "@common/entities/lead.entity"
import { AppDataSource } from "@core/core.db"
import { LeadRequestData } from "./data"
import { BrandEntity } from "@common/entities/brand..entity"
import { DateTime } from "luxon"
// import { DAYS_OF_THE_WEEK } from '../../../common/constants/index';
import { AffiliateEntity } from "@common/entities/affiliate.entity"
// import { UnAuthorizedError } from "@core/core.error"

export class ApiService {
    private leadRepository = AppDataSource.getRepository(LeadEntity)
    private apiKeyRepository = AppDataSource.getRepository(APIKeyEntity)
    private brandRepository = AppDataSource.getRepository(BrandEntity)

    async getUserLeads(apiKey: string) {
        const { affiliate, brand } = await this.getAffiliateFromAPIKey(apiKey)

        if (affiliate) {
            return await this.leadRepository.find({
                where: {
                    affiliate: {
                        id: affiliate.id
                    }
                },
                relations: ["affiliate"]
            })
        }
        return await this.leadRepository.find({
            where: {
                brand: {
                    id: brand?.id
                }
            },
            relations: ["brand"]
        })

    }
    async addLead(apiKey: string, leadData: LeadRequestData) {
        const { affiliate } = await this.getAffiliateFromAPIKey(apiKey)
        const allBrands = await this.brandRepository.find({
            where: {
                country: affiliate?.country
            }
        })
        const newLeadRequest = this.leadRepository.create({
            ...leadData,
            affiliate,
            country:affiliate?.country,
            brand: allBrands[0],
        })
        const newLead = await this.leadRepository.save(newLeadRequest)

        return newLead
    }

    private async getAffiliateFromAPIKey(apiKey: string) {
        const apiKeyRes = await this.apiKeyRepository.findOne({
            where: {
                id: apiKey
            },
            relations: ["affiliate"]
        })

        const affiliate = apiKeyRes?.affiliate
        const brand = apiKeyRes?.brand

        return { affiliate, brand }
    }
    private getAffiliateTrafficDetails(affiliate: AffiliateEntity) {

        const currentDate = DateTime.now()
        const affiliateClosingTime = DateTime.fromFormat(affiliate?.closingTime as string, "hh:mm")
        const affiliateOpeningTime = DateTime.fromFormat(affiliate?.openingTime as string, "hh:mm")

        const openingDiff = currentDate.diff(affiliateOpeningTime).milliseconds / (1000 * 60)
        const closingDiff = currentDate.diff(affiliateClosingTime).milliseconds / (1000 * 60)

        console.log({ openingDiff, closingDiff })

        return {

        }

    }
}