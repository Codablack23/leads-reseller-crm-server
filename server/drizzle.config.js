"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_kit_1 = require("drizzle-kit");
const core_secrets_1 = require("./src/core/core.secrets");
exports.default = (0, drizzle_kit_1.defineConfig)({
    dialect: "mysql",
    schema: "./src/*/schema/",
    out: "./server/drizzle",
    dbCredentials: {
        host: core_secrets_1.MYSQL_DB_HOST,
        database: core_secrets_1.MYSQL_DB,
        password: core_secrets_1.MYSQL_DB_PASSWORD,
        port: parseInt(core_secrets_1.MYSQL_DB_PORT ? core_secrets_1.MYSQL_DB_PORT : "55263"),
        user: core_secrets_1.MYSQL_DB_USER,
    }
});
