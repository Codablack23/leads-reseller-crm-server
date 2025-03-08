import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}

