import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AffiliateEntity } from "./affiliate.entity";
import { BrandEntity } from "./brand.entity";

@Entity({ name: "api_keys" })
export class APIKeyEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text",{default: "ACTIVE"})
    status: string;

    @ManyToOne(() => AffiliateEntity, (affiliate) => affiliate.apiKey,{onDelete: "CASCADE"})
    affiliate: AffiliateEntity

    @ManyToOne(() => BrandEntity, (brand) => brand.apiKey,{onDelete: "CASCADE"})
    brand: BrandEntity

    @Column("date")
    expiresAt: Date
}

