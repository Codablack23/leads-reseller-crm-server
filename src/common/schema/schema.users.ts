import { date, longtext, mysqlTable, text,timestamp} from "drizzle-orm/mysql-core";

const timestamps = {
    updated_at: timestamp().defaultNow().notNull(),
    created_at: timestamp().defaultNow().notNull(),
    deleted_at: timestamp(),
}

export const users = mysqlTable("users",{
    id:text().unique().primaryKey(),
    firstname:longtext(),
    lastname:longtext(),
    password:longtext(),
    roles:longtext(),
    phoneNumber:text("phone_number"),
    dob:date(),
    email:text(),
    ...timestamps,
})