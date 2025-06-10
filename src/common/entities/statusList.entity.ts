import { 
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { StatusType } from "@common/enums";
import { StatusMapEntity } from "./statusMap.entity";

@Entity({ name: "status_list" })
export class StatusListEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text")
  label_theme: string;

  @Column("text")
  label_text_color: string;

  @Column({
    type: 'enum',
    enum: StatusType,
    default: StatusType.GENERAL,
  })
  status_type: StatusType;

  @Column("boolean", { default: true })
  enabled: boolean;

  @OneToMany(() => StatusMapEntity, (statusMap) => statusMap.status, {
    cascade: false,
    nullable:true,
    onDelete: 'NO ACTION',
  })
  status_map: StatusMapEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
