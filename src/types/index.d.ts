import { UserSessionData } from "@interfaces/index";
import { SessionData } from 'express-session';
import { Request } from "express";




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
export interface LeadQuery {
    is_ftd?:boolean,
    email?:string,
    call_status?:string,
    ftd_status?:string,
    start_date?:Date,
    end_date?:Date,
}

export type QueryRequest<T = DefaultQuery> = Request<{}, any, any, T>
export type QueryCleanerHandler<T> = (queryReq: QueryRequest<T>) => T

export type ExtendedObject<T> = T & {[key:string]:any}  

export * from "./leads.type"
