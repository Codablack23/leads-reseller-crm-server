import { date, longtext, mysqlTable, text, timestamp,} from "drizzle-orm/mysql-core";
import { vendors } from "./schema.vendors";

const timestamps = {
    updated_at: timestamp().defaultNow().notNull(),
    created_at: timestamp().defaultNow().notNull(),
  }

export const promotionsTable = mysqlTable("promotions",{
    id:text().primaryKey().primaryKey(),
    name:longtext(),
    vendorId:text("vendor_id"),
    promotionId:text("promotion_id"),
    description:text(),
    discountRate:text("discount_rate"),
    startDate:date("start_date"),
    endDate:date("end_date"),
    ...timestamps,
})