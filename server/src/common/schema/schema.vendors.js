"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendors = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const schema_users_1 = require("./schema.users");
const timestamps = {
    updated_at: (0, mysql_core_1.timestamp)().defaultNow().notNull(),
    created_at: (0, mysql_core_1.timestamp)().defaultNow().notNull(),
    deleted_at: (0, mysql_core_1.timestamp)(),
};
exports.vendors = (0, mysql_core_1.mysqlTable)("vendor", Object.assign({ id: (0, mysql_core_1.text)().unique().primaryKey(), name: (0, mysql_core_1.longtext)().unique(), userId: (0, mysql_core_1.longtext)().references(() => schema_users_1.users.id), logo: (0, mysql_core_1.text)(), banner: (0, mysql_core_1.text)() }, timestamps));
