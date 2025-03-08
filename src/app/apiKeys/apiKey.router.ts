import { Router } from "express";
import AffiliateController from "./apiKey.controller";
import useValidation from "@common/middlewares/middleware.validate";
import { APIKeyValidator } from "./apiKey.validator";

const apiKeyRouter = Router()
apiKeyRouter.get("/",AffiliateController.getKeys)

apiKeyRouter.post("/",
    useValidation(APIKeyValidator.createApiKeySchema),
    AffiliateController.generateApiKey
)

apiKeyRouter.patch("/:id",
    useValidation(APIKeyValidator.revokeApiKeySchema),
    AffiliateController.revokeKey
)

apiKeyRouter.delete("/:id",
    useValidation(APIKeyValidator.revokeApiKeySchema),
    AffiliateController.deleteKey
)

export default {
    routeGroup: "/api-keys",
    routeHandler: apiKeyRouter,
}