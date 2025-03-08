import {
    Request,
    RequestHandler,
    Response,
} from "express";

type RouterCallBack = (req:Request,res:Response)=>Promise<void>;

type RouterHandlerFunction =(
    handlerCallBack:RouterCallBack,
) => RequestHandler

export class RouterHandlerMiddleware {
    static handleRoute:RouterHandlerFunction=(handlerCallBack)=>{
        return async(req, res,next) => {
            try {
                await handlerCallBack(req,res);
            } catch (error) {
                next(error);
            }
        }
    }
}