export interface AffiliateRequestData {
    name :string,
    email :string,
    country:string
    dailyCap:number,
    lead_opening_time:string,
    lead_closing_time:string,
    traffic_days:string[]
}
export interface AffiliateUpdateRequestData {
    affiliateId?:string,
    name? :string,
    email? :string,
}
export interface TrafficRequestData {
    weight?: number;
    priority?: number;
    dailyCap: number;
    skipFallback?: boolean;
    country:string,
    openingTime:string,
    closingTime:string,
    trafficDays:string
    brandId:string
}
export interface TrafficUpdateRequestData {
    weight?: number;
    priority?: number;
    dailyCap?: number;
    skipFallback?: boolean;
    country?:string,
    openingTime?:string,
    closingTime?:string,
    trafficDays?:string
    brandId?:string
}

export interface Data{
    [key:string]:any
}