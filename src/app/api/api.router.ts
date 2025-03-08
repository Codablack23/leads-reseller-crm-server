import { Router } from "express";
import v1ApiRouter from "./v1/router";
import cors from 'cors';


const apiRouter = Router()
apiRouter.use(cors({
    origin:"*",
    credentials:true,
    methods:["POST","GET","PUT","PATCH","DELETE"],
}))
apiRouter.use("/v1", v1ApiRouter)


export default {
    routeGroup: "/api",
    routeHandler: apiRouter,
}