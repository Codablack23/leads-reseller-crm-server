import { Router } from "express";
import v1ApiRouter from "./v1/router";


const apiRouter = Router()
apiRouter.use("/v1", v1ApiRouter)


export default {
    routeGroup: "/api",
    routeHandler: apiRouter,
}