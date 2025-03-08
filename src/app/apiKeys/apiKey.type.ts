export interface APIKeyRequestData {
    affiliateId?:string,
    brandId?:string,
}

export interface Data{
    [key:string]:any
}

export enum API_KEY_STATUS {
    REVOKED="REVOKED",
    ACTIVE="ACTIVE",
    EXPIRED="EXPIRED",
}