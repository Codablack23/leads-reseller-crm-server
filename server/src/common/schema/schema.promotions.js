"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promotionsTable = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const timestamps = {
    updated_at: (0, mysql_core_1.timestamp)().defaultNow().notNull(),
    created_at: (0, mysql_core_1.timestamp)().defaultNow().notNull(),
};
exports.promotionsTable = (0, mysql_core_1.mysqlTable)("promotions", Object.assign({ id: (0, mysql_core_1.text)().primaryKey().primaryKey(), name: (0, mysql_core_1.longtext)(), vendorId: (0, mysql_core_1.text)("vendor_id"), promotionId: (0, mysql_core_1.text)("promotion_id"), description: (0, mysql_core_1.text)(), discountRate: (0, mysql_core_1.text)("discount_rate"), startDate: (0, mysql_core_1.date)("start_date"), endDate: (0, mysql_core_1.date)("end_date") }, timestamps));
