import { boolean, longtext, mysqlTable, text, timestamp,} from "drizzle-orm/mysql-core";
import { vendors } from "./schema.vendors";

const timestamps = {
    updated_at: timestamp().defaultNow().notNull(),
    created_at: timestamp().defaultNow().notNull(),
    deleted_at: timestamp(),
  }

export const stores = mysqlTable("stores",{
    id:text().unique().primaryKey(),
    name:longtext().unique(),
    vendorId:longtext("vendor_id").references(()=>vendors.id),
    hasRider:boolean("has_rider").default(false),
    logo:text(),
    banner:text(),
    ...timestamps,
})