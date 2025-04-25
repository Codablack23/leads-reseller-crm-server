import { AffiliateEntity } from "@common/entities/affiliate.entity";
import { BrandEntity } from "@common/entities/brand.entity";
import { User } from "@interfaces/index";

export interface LoginRequest{
    email:string;
    password:string;
}

export interface SignUpRequest extends User {
    name:string;
    password:string;
    userType?:"SUPERUSER" | "AFFILIATE" | "BRAND";
}

export interface RegistrationRelation{
    brand?:BrandEntity,
    affiliate?:AffiliateEntity
}
