import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { APIKeyEntity } from "./apiKey.entity";
import { LeadEntity } from "./lead.entity";
import { TrafficEntity } from "./traffic.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "brands" })
export class BrandEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text", { nullable: true })
    name: string;

    @Column("text")
    email: string;

    @OneToMany(() => APIKeyEntity, (apiKey) => apiKey.affiliate)
    apiKey: APIKeyEntity;

    @OneToMany(() => TrafficEntity, (traffic) => traffic.lead)
    traffic: TrafficEntity;

    @OneToOne(() => UserEntity, (user) => user.brand)
    @JoinColumn()
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;  // Automatically set when record is inserted

    @UpdateDateColumn()
    updatedAt: Date;
}

