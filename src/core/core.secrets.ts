import {config} from "dotenv"

config()

export const MONGODB_URI = process.env.MONGODB_URI
export const SECRET_KEY = process.env.SECRET_KEY
export const APP_ENV = process.env.APP_ENV
export const PORT = process.env.PORT
export const MYSQL_DB = process.env.MYSQL_DB
export const MYSQL_DB_HOST = process.env.MYSQL_DB_HOST
export const MYSQL_DB_PORT = process.env.MYSQL_DB_PORT
export const MYSQL_DB_USER = process.env.MYSQL_DB_USER
export const MYSQL_DB_PASSWORD = process.env.MYSQL_DB_PASSWORD
export const DB_DIALECT = process.env.DB_DIALECT
export const APP_NAME = process.env.APP_NAME
