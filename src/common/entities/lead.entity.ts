import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TrafficEntity } from "./traffic.entity";
import { StatusMapEntity } from "./statusMap.entity";

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

    @Column("text", { default: "RECEIVED" })
    status: string;

    @Column("text", { nullable: true })
    source: string;

    @Column("text", { nullable: true })
    campaign: string;

    @Column("text", { default: "PENDING", })
    receiver_status: string;
    
    @Column("text", { default: "PENDING", })
    call_status: string;
    
    @Column("text", { default: "PENDING",nullable:true })
    ftd_status: string;
    
    @Column("date", { nullable:true })
    ftd_date?: string; 
    
    @Column("longtext", { nullable:true })
    ftd_description?: string;
    
    @Column("boolean", { default: false })
    is_ftd: boolean;

    @ManyToOne(() => TrafficEntity, (traffic) => traffic.lead, { cascade: false, onDelete: 'NO ACTION' })
    traffic: TrafficEntity;

    @OneToMany(() => StatusMapEntity, (statusMap) => statusMap.lead, { cascade: false, onDelete: 'NO ACTION' })
    statusMap: StatusMapEntity[];

    @CreateDateColumn()
    createdAt: Date;  // Automatically set when record is inserted

    @UpdateDateColumn()
    updatedAt: Date;
}

