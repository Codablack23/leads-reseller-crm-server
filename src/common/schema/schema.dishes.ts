import{
    decimal,
    int,
    longtext,
    mysqlTable,
    text,
    timestamp,
} from "drizzle-orm/mysql-core";


// import { vendors } from "./schema.vendors";
// import { promotionsTable } from "./schema.promotions";

const timestamps = {
    updated_at: timestamp().defaultNow().notNull(),
    created_at: timestamp().defaultNow().notNull(),
    deletedAt: timestamp(),
  }

export const dishesTable = mysqlTable("dishes",{
    id:text().primaryKey(),
    name:longtext(),
    vendorId:text("vendor_id"),
    promotionId:text("promotion_id"),
    category:text(),
    banner:text(),
    price:decimal(),
    ...timestamps,
})