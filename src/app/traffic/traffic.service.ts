import { AppDataSource } from "@core/core.db"
import { AffiliateEntity } from '../../common/entities/affiliate.entity';
import { NotFoundError } from "@core/core.error";
import {  Data, TrafficUpdateRequestData } from "./traffic.type";
import { TrafficEntity } from "@common/entities/traffic.entity";

export class TrafficService {
    private affiliateRepository = AppDataSource.getRepository(AffiliateEntity)
    private trafficRepository = AppDataSource.getRepository(TrafficEntity)

    async getTraffic(affiliateId:string) {
        const traffic = await this.trafficRepository.find({
             relations:{
                affiliate:true
             }
        })
        return traffic
    }

    async getTrafficDetails(id: string) {
        const traffic = await this.trafficRepository.findOne({ where: { id } })
        if (!traffic) throw new NotFoundError("Traffic does not exist")
        return traffic
    }


    async updateAffiliateTraffic(id: string, updatedData: TrafficUpdateRequestData) {
        const queryData = this.removeEmptyKeysFromObject(updatedData)
        const traffic = await this.trafficRepository.update({ id }, { ...queryData })
        return traffic
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