import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
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

    @Column("time")
    openingTime: string;

    @Column("time")
    closingTime: string;

    @Column("json", { nullable: true })
    trafficDays: string[];

    @OneToMany(() => LeadEntity, (lead) => lead.traffic, {
        cascade: false,
        onDelete: 'NO ACTION'
    })
    lead: LeadEntity[];

    @ManyToOne(() => BrandEntity, (brand) => brand.traffic, {
        onDelete: 'SET NULL',
        nullable: true,
    })
    brand: BrandEntity;

    @ManyToOne(() => AffiliateEntity, (affiliate) => affiliate.traffic, {
        onDelete: 'SET NULL',
        nullable: true,
    })
    affiliate: AffiliateEntity;

    @CreateDateColumn()
    createdAt: Date;  // Automatically set when record is inserted

    @UpdateDateColumn()
    updatedAt: Date;

}

