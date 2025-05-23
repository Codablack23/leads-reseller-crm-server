import { UserSessionData } from "@interfaces/index";
import { SessionData } from 'express-session';
import { Request } from "express";

export { }

declare global {
    namespace Express {
        export interface Request extends Error { }
    }
}

declare module "express-session" {
    interface SessionData {
        user: UserSessionData;
    }
}


export interface DefaultQuery {
    page?: string,
    limit?: string,
    [key: string]: string | undefined
}

export interface PaginatedQuery {
    page?: string,
    limit?: string
}
export interface Pagination {
    page: number,
    limit: number
}
export interface FtdQuery {
    is_ftd?:boolean
}

export type QueryRequest<T = DefaultQuery> = Request<{}, any, any, T>
export type QueryCleanerHandler<T> = (queryReq: QueryRequest<T>) => T

export type ExtendedObject<T> = T & {[key:string]:any}  

