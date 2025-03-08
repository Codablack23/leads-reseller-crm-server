"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dishesTable = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
// import { vendors } from "./schema.vendors";
// import { promotionsTable } from "./schema.promotions";
const timestamps = {
    updated_at: (0, mysql_core_1.timestamp)().defaultNow().notNull(),
    created_at: (0, mysql_core_1.timestamp)().defaultNow().notNull(),
    deletedAt: (0, mysql_core_1.timestamp)(),
};
exports.dishesTable = (0, mysql_core_1.mysqlTable)("dishes", Object.assign({ id: (0, mysql_core_1.text)().primaryKey(), name: (0, mysql_core_1.longtext)(), vendorId: (0, mysql_core_1.text)("vendor_id"), promotionId: (0, mysql_core_1.text)("promotion_id"), category: (0, mysql_core_1.text)(), banner: (0, mysql_core_1.text)(), price: (0, mysql_core_1.decimal)() }, timestamps));
