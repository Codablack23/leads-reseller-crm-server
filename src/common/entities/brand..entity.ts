import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { APIKeyEntity } from "./apiKey.entity";
import { LeadEntity } from "./lead.entity";

@Entity({name: "brands"})
export class BrandEntity{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text",{nullable: true})
    name:string;

    @Column("text",{nullable: true})
    country:string;

    @Column("text",{nullable: true})
    openingTime:string;

    @Column("text",{nullable: true})
    closingTime:string;

    @Column("text",{nullable: true})
    trafficDays:string;

    @Column("text",{nullable: true})
    status:string;

    @Column("text")
    email:string;

    @OneToMany(()=>APIKeyEntity,(apiKey)=>apiKey.affiliate)
    apiKey:APIKeyEntity;

    @OneToMany(()=>LeadEntity,(lead)=>lead.brand)
    lead:APIKeyEntity;
}

