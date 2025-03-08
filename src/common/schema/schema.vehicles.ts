import { longtext, mysqlTable, text, timestamp,} from "drizzle-orm/mysql-core";
import { users } from "./schema.users";

const timestamps = {
    updated_at: timestamp().defaultNow().notNull(),
    created_at: timestamp().defaultNow().notNull(),
    deleted_at: timestamp(),
  }

export const vehicles = mysqlTable("vehicles",{
    id:text().unique().primaryKey(),
    name:longtext().unique(),
    description:longtext(),
    region:longtext(),
    userId:longtext("user_id").references(()=>users.id),
    logo:text(),
    banner:text(),
    ...timestamps,
})