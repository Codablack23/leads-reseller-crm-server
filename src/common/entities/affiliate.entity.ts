import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { APIKeyEntity } from "./apiKey.entity";
import { UserEntity } from "./user.entity";
import { TrafficEntity } from "./traffic.entity";
import { StatusMapEntity } from "./statusMap.entity";
import { LeadEntity } from "./lead.entity";

@Entity({ name: "affiliates" })
export class AffiliateEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("longtext", { unique: true })
    affiliateId: string;

    @Column("text", { nullable: true })
    name: string;

    @Column("text", { nullable: true })
    email: string;

    @OneToMany(() => APIKeyEntity, (apiKey) => apiKey.affiliate)
    apiKey: APIKeyEntity[];

    @OneToMany(() => TrafficEntity, (traffic) => traffic.affiliate, { nullable: true })
    traffic: TrafficEntity[];

    @OneToMany(() => LeadEntity, (lead) => lead.affiliate, { nullable: true })
    lead: LeadEntity[];

    @OneToMany(() => StatusMapEntity, (statusMap) => statusMap.affiliate, { nullable: true })
    statusMap?: StatusMapEntity[];

    @OneToOne(() => UserEntity, (user) => user.affiliate, { nullable: true })
    @JoinColumn()
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;  // Automatically set when record is inserted

    @UpdateDateColumn()
    updatedAt: Date;
}

