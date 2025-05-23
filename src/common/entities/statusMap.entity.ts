import { 
    Column, 
    CreateDateColumn, 
    Entity,
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";
import { StatusMapType } from "@common/enums";

@Entity({ name: "status_map" })
export class StatusMapEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text",{unique:true})
    from_status: string;

    @Column({
        type: 'enum',
        enum: StatusMapType,
        default: StatusMapType.STATUS,
    })
    status_type: StatusMapType;

    @Column("text")
    to_status: string;    
    
    @Column("boolean",{default:true})
    enabled: boolean;

    @Column("date")
    expiresAt: Date

    @CreateDateColumn()
    createdAt: Date;  // Automatically set when record is inserted

    @UpdateDateColumn()
    updatedAt: Date;
}

