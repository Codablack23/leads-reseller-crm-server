import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { StatusMapType } from "@common/enums";
import { StatusListEntity } from "./statusList.entity";
import { LeadEntity } from "./lead.entity";
import { AffiliateEntity } from "./affiliate.entity";

@Entity({ name: "status_map" })
export class StatusMapEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text")
    status_text: string;

    @Column({
        type: 'enum',
        enum: StatusMapType,
        default: StatusMapType.STATUS,
    })
    target_type: StatusMapType;

    // @Index(["status_text", "lead", "status"], { unique: true })

    @Column("boolean",{default:true})
    enabled: boolean;

    @ManyToOne(() => StatusListEntity, (status) => status.status_map, { nullable:true,cascade: false, onDelete: 'NO ACTION' })
    status?: StatusListEntity;

    @ManyToOne(() => LeadEntity, (lead) => lead.statusMap,{ nullable:true,cascade: false, onDelete: 'NO ACTION' })
    lead?: LeadEntity;

    @ManyToOne(() => AffiliateEntity, (affiliate) => affiliate.statusMap,{ nullable:true,cascade: false, onDelete: 'NO ACTION' })
    affiliate?: AffiliateEntity;

    @CreateDateColumn()
    createdAt: Date;  // Automatically set when record is inserted

    @UpdateDateColumn()
    updatedAt: Date;
}

