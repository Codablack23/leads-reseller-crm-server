import { BrandEntity } from "@common/entities/brand.entity"
import { AppDataSource } from "@core/core.db"
import { NotFoundError } from "@core/core.error"
import { BrandRequestData, BrandUpdateRequestData, Data } from "./brand.type"
import { AuthService } from "@app/auth/auth.service"
import { BRAND_DEFAULT_PASSWORD } from "@core/core.secrets"

export class BrandService {
    private brandRepository = AppDataSource.getRepository(BrandEntity)
    private authService = new AuthService()
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
        const brandInstance = this.brandRepository.create({
            ...brandData,
        })
        const newBrand = await this.brandRepository.save(brandInstance)
        const user  = await this.authService.registerUser({
            name: `${newBrand.name}`,
            password: `${BRAND_DEFAULT_PASSWORD}`,
            email: `${newBrand.email}`
        },{
            brand: newBrand,
        })
        return {
            ...brandData,
            ...user,
            id: newBrand.id
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