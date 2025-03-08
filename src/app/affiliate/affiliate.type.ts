export interface AffiliateRequestData {
    affiliateId:string,
    name? :string,
    email? :string,
    country:string,
    openingTime:string,
    closingTime:string,
    trafficDays:string
}
export interface AffiliateUpdateRequestData {
    affiliateId?:string,
    name? :string,
    email? :string,
    country?:string,
    openingTime?:string,
    closingTime?:string,
    trafficDays?:string
}

export interface Data{
    [key:string]:any
}