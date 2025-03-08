import { APIKeyEntity } from "@common/entities/apiKey.entity";
import { AppDataSource } from "@core/core.db";
import { BadRequest } from "@core/core.error";
import {
    RequestHandler,
} from "express";
import { DateTime } from "luxon";


const apiKeyRepository = AppDataSource.getRepository(APIKeyEntity)

export class ApiMiddleware {
    static validateApiKey: RequestHandler = async (req, res, next) => {
        try {
            const apiKey = req.query.apiKey;
            if (!apiKey) throw new BadRequest("Please provide your API Key");
            const existingApiKey = await apiKeyRepository.findOne({ where: { id: apiKey as string } })
            if (!existingApiKey) throw new BadRequest("Invalid API Key");

            const expiresAt = existingApiKey.expiresAt
            const timeDifference = DateTime.fromJSDate(expiresAt).diffNow();
            if (timeDifference.milliseconds < 1) throw new BadRequest("Invalid API Key");
            
            (req as any).apiKey = apiKey;

            next()

        } catch (error) {
            next(error);
        }
    }
}

