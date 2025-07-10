import  { SessionOptions } from "express-session";


export interface ControllerService{
    [key:string]: any;
}
export interface User{
    email:string;
    name:string,
}

export interface UserSessionData extends User{
    userId:string,
    last_signed_in:string;
    ip_address?:string,
}

export interface DBConfig {
    username: string | undefined;
    password: string | undefined;
    port: string | undefined;
    db: string | undefined;
    host: string | undefined;
}

export type SessionConfigBuilder=()=>SessionOptions

export interface AppValidationError{
    [key:string]:string
}

export interface LeadStatusRequestData{
    lead_update:[
        {
            lead_id:string,
            call_status?:string,
            status?:string,
        }
    ]
}
export interface LeadFtdStatusRequestData{
    lead_update:[
        {
            lead_id:string,
            ftd_status:string,
        }
    ]
}