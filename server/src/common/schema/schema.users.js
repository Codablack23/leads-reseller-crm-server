"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const timestamps = {
    updated_at: (0, mysql_core_1.timestamp)().defaultNow().notNull(),
    created_at: (0, mysql_core_1.timestamp)().defaultNow().notNull(),
    deleted_at: (0, mysql_core_1.timestamp)(),
};
exports.users = (0, mysql_core_1.mysqlTable)("users", Object.assign({ id: (0, mysql_core_1.text)().unique().primaryKey(), firstname: (0, mysql_core_1.longtext)(), lastname: (0, mysql_core_1.longtext)(), password: (0, mysql_core_1.longtext)(), roles: (0, mysql_core_1.longtext)(), phoneNumber: (0, mysql_core_1.text)("phone_number"), dob: (0, mysql_core_1.date)(), email: (0, mysql_core_1.text)() }, timestamps));
