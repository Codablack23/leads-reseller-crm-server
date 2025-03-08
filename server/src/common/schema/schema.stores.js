"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stores = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const schema_vendors_1 = require("./schema.vendors");
const timestamps = {
    updated_at: (0, mysql_core_1.timestamp)().defaultNow().notNull(),
    created_at: (0, mysql_core_1.timestamp)().defaultNow().notNull(),
    deleted_at: (0, mysql_core_1.timestamp)(),
};
exports.stores = (0, mysql_core_1.mysqlTable)("stores", Object.assign({ id: (0, mysql_core_1.text)().unique().primaryKey(), name: (0, mysql_core_1.longtext)().unique(), vendorId: (0, mysql_core_1.longtext)("vendor_id").references(() => schema_vendors_1.vendors.id), hasRider: (0, mysql_core_1.boolean)("has_rider").default(false), logo: (0, mysql_core_1.text)(), banner: (0, mysql_core_1.text)() }, timestamps));
