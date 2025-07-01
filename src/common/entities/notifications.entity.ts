import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// import { LeadStatus } from "../../types/index";

@Entity({ name: "notifications" })
export class NotificationEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text")
    title: string;

    @Column("json")
    payload: Record<string, any>;

    @Column("longtext")
    message: string;

    @Column("boolean", { default: false })
    read: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}

