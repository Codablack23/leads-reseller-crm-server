import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AffiliateEntity } from "./affiliate.entity";
import { BrandEntity } from "./brand.entity";

@Entity({name: "users"})
export class UserEntity{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text")
    name:string;

    @Column("text")
    email:string;

    @Column({type:"text"})
    password:string;

    @Column({type:"text",default:"SUPERUSER"})
    userType:string;

    @OneToOne(type => AffiliateEntity,(affiliate) => affiliate.user,{onDelete: "CASCADE"})
    @JoinColumn()
    affiliate:AffiliateEntity;
    
    @OneToOne(type => BrandEntity,(brand) => brand.user,{onDelete: "CASCADE"})
    @JoinColumn()
    brand:BrandEntity;
}

