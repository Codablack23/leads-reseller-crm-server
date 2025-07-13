import {
    NextFunction,
    Request,
    Response,
    ErrorRequestHandler
} from "express"
import AppLogger from '@core/core.logger';
import AppResponse from "@common/services/service.response";
import { BadRequest, NotFoundError, UnAuthorizedError } from "./core.error";
import session from "express-session";
import { APP_ENV, SECRET_KEY } from "./core.secrets";
import connectSessionSequelize  from 'connect-session-sequelize'
import  {v4} from "uuid"
import { sequelize } from "./core.db";
import { SessionConfigBuilder } from "@interfaces/index";
import { SIX_MONTHS } from "@common/constants";

const SequelizeStore =  connectSessionSequelize(session.Store)
const sequelizeStore = new SequelizeStore({db:sequelize})

const getSessionConfig:SessionConfigBuilder = ()=>{
    if(APP_ENV === "development"){
        return({
            secret:SECRET_KEY as string,
            genid:()=>v4(),
            resave:false,
            saveUninitialized:false,
            name:"leads-reseller-server",
            store:sequelizeStore,
            cookie:{
                secure:false,
                maxAge:SIX_MONTHS,
                // sameSite:"none"
            }
        })
    }
    return({
        secret:SECRET_KEY as string,
        genid:()=>v4(),
        resave:false,
        saveUninitialized:false,
        proxy:true,
        name:"leads-reseller-server",
        store:sequelizeStore,
        cookie:{
            secure:APP_ENV !== "production",
            maxAge:SIX_MONTHS,
            sameSite:"none"
        }
    })
}

export const useError:ErrorRequestHandler = (err:Error,req,res,next)=>{

    console.log(err)

    if(err instanceof BadRequest){
        AppLogger.logError(err.httpCode,err.message);
        return AppResponse.sendFailedResponse(res,err.status,err.errors,err.message)
    }
    if(err instanceof NotFoundError){
        AppLogger.logError(err.httpCode,err.message);
        return AppResponse.sendErrorResponse(res,err.status,err.message)
    }
    if(err instanceof UnAuthorizedError){
        AppLogger.logError(err.httpCode,err.message);
        return AppResponse.sendErrorResponse(res,err.status,err.message)
    }
    AppLogger.logError("internal Server Error",err.message);
    AppResponse.sendErrorResponse(res,500,err.message);
}

const useURL= (req:Request,res:Response,next:NextFunction)=>{
    AppLogger.logDebug(req.method,req.url)
    next()
}
const useSession= ()=>{
    const sessionConfig = getSessionConfig()
    sequelizeStore.sync()
    return session(sessionConfig)
}

const appMiddlewares = [
    useURL,
    useSession()
]

export default appMiddlewares