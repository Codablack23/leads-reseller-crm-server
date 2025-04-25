import { BrandService } from "@app/brand/brand.service"
import { BrandRequestData } from "@app/brand/brand.type"


export class BrandAPIService {
    private brandService = new BrandService()

    async addBrand(requestData:BrandRequestData) {
        const brand = await this.brandService.addBrand(requestData)
        return brand
    }
}