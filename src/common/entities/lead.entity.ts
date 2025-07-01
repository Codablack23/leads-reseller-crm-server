import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TrafficEntity } from "./traffic.entity";
import { StatusMapEntity } from "./statusMap.entity";
import { LeadStatus } from "@common/enums";
import { AffiliateEntity } from "./affiliate.entity";
// import { LeadStatus } from "../../types/index";

@Entity({ name: "leads" })
export class LeadEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text")
    firstname: string;

    @Column("text")
    lastname: string;

    @Column("text", { nullable: true })
    country: string;

    @Column("text")
    email: string;

    @Column("text", { nullable: true })
    phone: string;

    @Column("text", { nullable:true })
    status?: string;

    @Column("json", { nullable:true })
    receiver_status?: Record<string,any>;

    @Column({ type: "enum", enum: LeadStatus })
    lead_status: LeadStatus;

    @Column("text", { nullable: true })
    source: string;

    @Column("text", { nullable: true })
    campaign?: string;

    @Column("text", { nullable: true })
    funnel_name?: string;

    @Column("text",)
    language: string;

    @Column("text", { nullable: true })
    type?: string;

    @Column("text", { nullable: true })
    rejection_reason?: string;

    @Column("text", { nullable:true})
    call_status?: string;

    @Column("text", { nullable: true })
    ftd_status?: string;

    @Column("date", { nullable: true })
    ftd_date?: string;

    @Column("longtext", { nullable: true })
    ftd_description?: string;

    @Column("boolean", { default: false })
    is_ftd: boolean;

    @ManyToOne(() => TrafficEntity, (traffic) => traffic.lead, { cascade: false, onDelete: 'NO ACTION' })
    traffic: TrafficEntity;

    @ManyToOne(() => AffiliateEntity, (affiliate) => affiliate.lead, { cascade: false, onDelete: 'NO ACTION',nullable:true })
    affiliate: AffiliateEntity;

    @OneToMany(() => StatusMapEntity, (statusMap) => statusMap.lead, { cascade: false, nullable: true, onDelete: 'NO ACTION' })
    statusMap: StatusMapEntity[];

    @CreateDateColumn()
    createdAt: Date;  // Automatically set when record is inserted

    @UpdateDateColumn()
    updatedAt: Date;

}

