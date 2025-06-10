"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.sequelize = void 0;
exports.default = getDatabase;
const statusMap_entity_1 = require("../common/entities/statusMap.entity");
const affiliate_entity_1 = require("../common/entities/affiliate.entity");
const apiKey_entity_1 = require("../common/entities/apiKey.entity");
const brand_entity_1 = require("../common/entities/brand.entity");
const lead_entity_1 = require("../common/entities/lead.entity");
const traffic_entity_1 = require("../common/entities/traffic.entity");
const user_entity_1 = require("../common/entities/user.entity");
const core_secrets_1 = require("./core.secrets");
const mysql2_1 = require("drizzle-orm/mysql2");
const promise_1 = __importDefault(require("mysql2/promise"));
const sequelize_1 = require("sequelize");
const typeorm_1 = require("typeorm");
const statusList_entity_1 = require("../common/entities/statusList.entity");
function getDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const port = core_secrets_1.MYSQL_DB_PORT ? parseInt(core_secrets_1.MYSQL_DB_PORT) : 55263;
        const connection = yield promise_1.default.createConnection({
            host: core_secrets_1.MYSQL_DB_HOST,
            user: core_secrets_1.MYSQL_DB_USER,
            port,
            database: core_secrets_1.MYSQL_DB,
            password: core_secrets_1.MYSQL_DB_PASSWORD,
        });
        return (0, mysql2_1.drizzle)(connection);
    });
}
exports.sequelize = new sequelize_1.Sequelize(core_secrets_1.MYSQL_DB, core_secrets_1.MYSQL_DB_USER, core_secrets_1.MYSQL_DB_PASSWORD, {
    host: core_secrets_1.MYSQL_DB_HOST,
    dialect: 'mysql',
    port: core_secrets_1.MYSQL_DB_PORT,
    logging: false,
});
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: core_secrets_1.MYSQL_DB_HOST,
    port: core_secrets_1.MYSQL_DB_PORT,
    username: core_secrets_1.MYSQL_DB_USER,
    password: core_secrets_1.MYSQL_DB_PASSWORD,
    database: core_secrets_1.MYSQL_DB,
    entities: [
        user_entity_1.UserEntity,
        affiliate_entity_1.AffiliateEntity,
        apiKey_entity_1.APIKeyEntity,
        statusList_entity_1.StatusListEntity,
        brand_entity_1.BrandEntity,
        lead_entity_1.LeadEntity,
        statusMap_entity_1.StatusMapEntity,
        traffic_entity_1.TrafficEntity
    ],
    synchronize: true,
    logging: false,
});
