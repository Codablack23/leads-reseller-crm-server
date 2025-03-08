import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { APIKeyEntity } from "./apiKey.entity";
import { LeadEntity } from "./lead.entity";

@Entity({name: "affiliates"})
export class AffiliateEntity{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("longtext",{unique: true})
    affiliateId: string;

    @Column("text",{nullable: true})
    name:string;

    @Column("text")
    country:string;

    @Column("text",)
    openingTime:string;

    @Column("text")
    closingTime:string;

    @Column("text")
    trafficDays:string;

    @Column("text",{default:"ACTIVE"})
    status:string;

    @Column("text",{nullable:true})
    email:string;

    @OneToMany(()=>APIKeyEntity,(apiKey)=>apiKey.affiliate)
    apiKey:APIKeyEntity;

    @OneToMany(()=>LeadEntity,(lead)=>lead.affiliate)
    lead:LeadEntity;
}

