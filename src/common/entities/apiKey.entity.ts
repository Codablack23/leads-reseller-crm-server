import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AffiliateEntity } from "./affiliate.entity";
import { BrandEntity } from "./brand.entity";

@Entity({ name: "api_keys" })
export class APIKeyEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text", { default: "ACTIVE" })
    status: string;

    @ManyToOne(() => AffiliateEntity, (affiliate) => affiliate.apiKey, { onDelete: "CASCADE" })
    affiliate: AffiliateEntity

    @ManyToOne(() => BrandEntity, (brand) => brand.apiKey, { onDelete: "CASCADE" })
    brand: BrandEntity

    @Column("date")
    expiresAt: Date

    @CreateDateColumn()
    createdAt: Date;  // Automatically set when record is inserted

    @UpdateDateColumn()
    updatedAt: Date;
}

