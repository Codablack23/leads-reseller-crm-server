import express from 'express'
import appRouter from "./core.routing";
import appMiddlewares,{useError} from "./core.middleware";
import { PORT } from "./core.secrets";
import AppLogger from "./core.logger";
import { NotFoundError } from './core.error';
import { UserSessionData } from '@interfaces/index';
import { AppDataSource } from './core.db';
import cors from "cors";
import { whitelist } from '../common/constants/index';


declare module "express-session" {
    interface SessionData {
        user: UserSessionData;
    }
}
const expressApp = express();

export async function runAppConfig(){

    await AppDataSource.initialize()
    //configuration for setting up core middleware from the core.middleware.js file
    expressApp.use(cors({
        credentials:true,
        origin:whitelist,
        methods:["POST","GET","PUT","PATCH","DELETE"],
    }))
    appMiddlewares.forEach(middleware=>{
        expressApp.use(middleware)
    })

    expressApp.use(express.static("public"))
    expressApp.use(express.json())


    //setup routes from registered routes from the core.routing.js
    expressApp.use(appRouter)

    expressApp.use("*",(req,res,next)=>{
        const err = new NotFoundError(`Not found - ${req.url}`)
        next(err)
    })
    expressApp.use(useError)

    const startServer = ()=>{
        expressApp.listen(PORT || 5501,()=>{
            AppLogger.logDebug("init", `Server Started and runinng at http://localhost:${PORT || 5501}/`);
        })
    }

    return {
        expressApp,
        startServer
    }
}