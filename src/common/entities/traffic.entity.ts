import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LeadEntity } from "./lead.entity";
import { BrandEntity } from "./brand.entity";
import { AffiliateEntity } from "./affiliate.entity";

@Entity({ name: "traffic" })
export class TrafficEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("bigint", { default: 1 })
    weight: number;

    @Column("bigint", { default: 1 })
    priority: number;

    @Column("bigint")
    dailyCap: number;

    @Column("boolean", { default: false })
    skipFallback: boolean;

    @Column("text", { nullable: true })
    country: string;

    @Column("text", { nullable: true })
    openingTime: string;

    @Column("text", { nullable: true })
    closingTime: string;

    @Column("text", { nullable: true })
    trafficDays: string;

    @OneToMany(() => LeadEntity, (lead) => lead.traffic)
    lead: LeadEntity;

    @ManyToOne(() => BrandEntity, (brand) => brand.traffic)
    brand: BrandEntity;

    @ManyToOne(() => AffiliateEntity, (affiliate) => affiliate.traffic)
    affiliate: AffiliateEntity;
}

