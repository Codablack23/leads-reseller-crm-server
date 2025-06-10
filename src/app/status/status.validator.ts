import { BrandEntity } from '@common/entities/brand.entity';
import { LeadEntity } from '@common/entities/lead.entity';
import { StatusListEntity } from '@common/entities/statusList.entity';
import { StatusMapEntity } from '@common/entities/statusMap.entity';
// import { StatusMapType } from '@common/enums';
import { AppDataSource } from '@core/core.db';
import { body } from 'express-validator';

class StatusMapValidatorClass {

    private statusMapRepository = AppDataSource.getRepository(StatusMapEntity)
    private statusListRepository = AppDataSource.getRepository(StatusListEntity)
    private leadRepository = AppDataSource.getRepository(LeadEntity)
    private brandRepository = AppDataSource.getRepository(BrandEntity)

    addStatusMapValidator = [
        body("status_text")
            .escape()
            .notEmpty().withMessage("Please provide the status you wish to map from")
            .custom(async (value: string) => {
                if (!value) throw new Error("Please provide the status you wish to map from");
                const existingMap = await this.statusMapRepository.findOne({
                    where: {
                        status_text: value.toLowerCase()
                    }
                })
                if (existingMap) throw new Error("Sorry you have already mapped this status")
            }),
        body("status_id")
            .escape()
            .notEmpty().withMessage("Please provide the status you wish to map from")
            .custom(async (value: string) => {
                if (!value) throw new Error("Please provide the status you wish to map from");
                const status = await this.statusListRepository.findOne({
                    where: {
                        id: value
                    }
                })
                if (!status) throw new Error("Sorry this status does not exist")
            }),
        body("lead_id")
            .escape()
            .optional()
            .notEmpty().withMessage("Please provide the lead you wish to map status")
            .custom(async (value: string) => {
                if (!value) throw new Error("Please provide the lead you wish to map status");
                const lead = await this.leadRepository.findOne({
                    where: {
                        id: value
                    }
                })
                if (!lead) throw new Error("Sorry this lead does not exist")
            }),
        body("brand_id")
            .escape()
            .optional()
            .notEmpty().withMessage("Please provide the brand you wish to map status")
            .custom(async (value: string) => {
                if (!value) throw new Error("Please provide the brand you wish to map status");
                const brand = await this.brandRepository.findOne({
                    where: {
                        id: value
                    }
                })
                if (!brand) throw new Error("Sorry this brand does not exist")
            }),
    ]
    addStatusValidator = [
        body("name")
            .escape()
            .notEmpty().withMessage("Please provide your status name")
            .custom(async (value: string) => {
                if (!value) throw new Error("Please provide your status name");
                const existingMap = await this.statusListRepository.findOne({
                    where: {
                        name: value.toLowerCase()
                    }
                })
                if (existingMap) throw new Error("Sorry you have already created this status")
            }),
        body("label_theme")
            .escape()
            .optional()
            .notEmpty()
            .withMessage("Please provide the label background color")
            .isHexColor().withMessage("Please provide a valid hex color code for label background color")
        ,
        body("label_text_color")
            .escape()
            .optional()
            .notEmpty()
            .isHexColor().withMessage("Please provide a valid hex color code for label text color")
    ]
}

export const StatusMapValidator = new StatusMapValidatorClass()
