import { StatusMapEntity } from '@common/entities/statusMap.entity';
import { StatusMapType } from '@common/enums';
import { AppDataSource } from '@core/core.db';
import { body } from 'express-validator';

class StatusMapValidatorClass{

    private statusMapRepository = AppDataSource.getRepository(StatusMapEntity)

    addStatusValidator = [
        body("from_status")
        .escape()
        .notEmpty().withMessage("Please provide the status you wish to map from")
        .custom(async(value:string)=>{
            if(!value) throw new Error("Please provide the status you wish to map from");
            const existingMap = await this.statusMapRepository.findOne({
                where:{
                    from_status:value.toLowerCase()
                }
            })
            if(existingMap) throw new Error("Sorry you have already mapped this status")
        }),
        body("to_status")
        .escape()
        .notEmpty()
        .withMessage("Please provide the status you wish to map to")
        .custom(async(value:string)=>{
            if(!value) throw new Error("Please provide the status you wish to map to");
        }),
        body("status_type")
        .escape()
        .optional()
        .notEmpty()
        .withMessage("Please provide the status you wish to map")
        .custom(async(value:StatusMapType)=>{
            const statusTypeArray = Object.values(StatusMapType)
            if(!statusTypeArray.includes(value)){
                throw new Error(`Sorry Status Map type can only be ${statusTypeArray.join(" or ")}`)
            }
        })
    ]
}

export const StatusMapValidator = new StatusMapValidatorClass()
