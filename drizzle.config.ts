import { defineConfig } from "drizzle-kit";
import { MYSQL_DB_HOST,MYSQL_DB,MYSQL_DB_PASSWORD,MYSQL_DB_PORT,MYSQL_DB_USER } from './src/core/core.secrets';


export default defineConfig({
  dialect: "mysql",
  schema: "./src/*/schema/",
  out: "./server/drizzle",
  dbCredentials: {
    host:MYSQL_DB_HOST as string,
    database:MYSQL_DB as string,
    password:MYSQL_DB_PASSWORD as string,
    port:parseInt(MYSQL_DB_PORT?MYSQL_DB_PORT:"55263"),
    user:MYSQL_DB_USER as string,
  }
});