import { longtext, mysqlTable, text, timestamp,} from "drizzle-orm/mysql-core";
import { users } from "./schema.users";

const timestamps = {
    updated_at: timestamp().defaultNow().notNull(),
    created_at: timestamp().defaultNow().notNull(),
    deleted_at: timestamp(),
  }

export const riders = mysqlTable("riders",{
    id:text().unique().primaryKey(),
    name:longtext().unique(),
    userId:longtext("user_id").references(()=>users.id),
    logo:text(),
    banner:text(),
    ...timestamps,
})