import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TrafficEntity } from "./traffic.entity";

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

    @ManyToOne(() => TrafficEntity, (traffic) => traffic.lead)
    traffic: TrafficEntity;
}

