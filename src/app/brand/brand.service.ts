import { BrandEntity } from "@common/entities/brand..entity"
import { AppDataSource } from "@core/core.db"
import { NotFoundError } from "@core/core.error"
import { BrandRequestData, BrandUpdateRequestData, Data } from "./brand.type"

export class BrandService {
    private brandRepository = AppDataSource.getRepository(BrandEntity)
    async getBrands() {
        const brands = await this.brandRepository.find()
        return brands
    }
    async getBrand(id: string) {
        const brand = await this.brandRepository.findOne({
            where: { id }
        })
        if (!brand) throw new NotFoundError("Sorry could not find brand")
        return brand

    }
    async addBrand(brandData: BrandRequestData) {
        const affiliateInstance = this.brandRepository.create({
            ...brandData,
        })
        const newAffiliate = await this.brandRepository.save(affiliateInstance)
        return {
            ...brandData,
            id: newAffiliate.id
        }
    }

    async deleteBrand(id: string) {
        await this.brandRepository.delete({ id })
        return { id }
    }

    async updateBrand(id: string, updatedData: BrandUpdateRequestData) {
        const queryData = this.removeEmptyKeysFromObject(updatedData)
        await this.brandRepository.update({ id }, { ...queryData })
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