"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicles = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const schema_users_1 = require("./schema.users");
const timestamps = {
    updated_at: (0, mysql_core_1.timestamp)().defaultNow().notNull(),
    created_at: (0, mysql_core_1.timestamp)().defaultNow().notNull(),
    deleted_at: (0, mysql_core_1.timestamp)(),
};
exports.vehicles = (0, mysql_core_1.mysqlTable)("vehicles", Object.assign({ id: (0, mysql_core_1.text)().unique().primaryKey(), name: (0, mysql_core_1.longtext)().unique(), description: (0, mysql_core_1.longtext)(), region: (0, mysql_core_1.longtext)(), userId: (0, mysql_core_1.longtext)("user_id").references(() => schema_users_1.users.id), logo: (0, mysql_core_1.text)(), banner: (0, mysql_core_1.text)() }, timestamps));
