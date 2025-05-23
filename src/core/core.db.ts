import { StatusMapEntity } from "@common/entities/statusMap.entity";
import { AffiliateEntity } from "../common/entities/affiliate.entity";
import { APIKeyEntity } from "../common/entities/apiKey.entity";
import { BrandEntity } from "../common/entities/brand.entity";
import { LeadEntity } from "../common/entities/lead.entity";
import { TrafficEntity } from "../common/entities/traffic.entity";
import { UserEntity } from "../common/entities/user.entity";

import {
    MYSQL_DB,
    MYSQL_DB_HOST,
    MYSQL_DB_PASSWORD,
    MYSQL_DB_PORT,
    MYSQL_DB_USER
} from "./core.secrets"

import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";
import { DataSource } from "typeorm";

export default async function getDatabase(){
    const port = MYSQL_DB_PORT ? parseInt(MYSQL_DB_PORT) : 55263

    const connection = await mysql.createConnection({
        host: MYSQL_DB_HOST,
        user: MYSQL_DB_USER,
        port,
        database: MYSQL_DB,
        password: MYSQL_DB_PASSWORD,
    })
    return drizzle(connection)
}

export const sequelize = new Sequelize(
    MYSQL_DB as string,
    MYSQL_DB_USER as string,
    MYSQL_DB_PASSWORD as string,
    {
        host:MYSQL_DB_HOST,
        dialect:'mysql',
        port:MYSQL_DB_PORT as any,
        logging:false,
    }
)

export const AppDataSource = new DataSource({
    type:"mysql",
    host: MYSQL_DB_HOST,
    port: MYSQL_DB_PORT as any,
    username: MYSQL_DB_USER,
    password: MYSQL_DB_PASSWORD,
    database: MYSQL_DB,
    entities:  [
        UserEntity,
        AffiliateEntity,
        APIKeyEntity,
        BrandEntity,
        LeadEntity,
        StatusMapEntity,
        TrafficEntity
    ],
    synchronize: true,
    logging: false,
})