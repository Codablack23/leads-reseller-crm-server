"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useError = void 0;
const core_logger_1 = __importDefault(require("./core.logger"));
const service_response_1 = __importDefault(require("../common/services/service.response"));
const core_error_1 = require("./core.error");
const express_session_1 = __importDefault(require("express-session"));
const core_secrets_1 = require("./core.secrets");
const connect_session_sequelize_1 = __importDefault(require("connect-session-sequelize"));
const uuid_1 = require("uuid");
const core_db_1 = require("./core.db");
const constants_1 = require("../common/constants");
const SequelizeStore = (0, connect_session_sequelize_1.default)(express_session_1.default.Store);
const sequelizeStore = new SequelizeStore({ db: core_db_1.sequelize });
const getSessionConfig = () => {
    if (core_secrets_1.APP_ENV === "development") {
        return ({
            secret: core_secrets_1.SECRET_KEY,
            genid: () => (0, uuid_1.v4)(),
            resave: false,
            saveUninitialized: false,
            name: "leads-reseller-server",
            store: sequelizeStore,
            cookie: {
                secure: false,
                maxAge: constants_1.SIX_MONTHS,
                // sameSite:"none"
            }
        });
    }
    return ({
        secret: core_secrets_1.SECRET_KEY,
        genid: () => (0, uuid_1.v4)(),
        resave: false,
        saveUninitialized: false,
        proxy: true,
        name: "leads-reseller-server",
        store: sequelizeStore,
        cookie: {
            secure: core_secrets_1.APP_ENV !== "production",
            maxAge: constants_1.SIX_MONTHS,
            sameSite: "none"
        }
    });
};
const useError = (err, req, res, next) => {
    if (err instanceof core_error_1.BadRequest) {
        core_logger_1.default.logError(err.httpCode, err.message);
        return service_response_1.default.sendFailedResponse(res, err.status, err.errors, err.message);
    }
    if (err instanceof core_error_1.NotFoundError) {
        core_logger_1.default.logError(err.httpCode, err.message);
        return service_response_1.default.sendErrorResponse(res, err.status, err.message);
    }
    if (err instanceof core_error_1.UnAuthorizedError) {
        core_logger_1.default.logError(err.httpCode, err.message);
        return service_response_1.default.sendErrorResponse(res, err.status, err.message);
    }
    core_logger_1.default.logError("internal Server Error", err.message);
    service_response_1.default.sendErrorResponse(res, 500, err.message);
};
exports.useError = useError;
const useURL = (req, res, next) => {
    core_logger_1.default.logDebug(req.method, req.url);
    next();
};
const useSession = () => {
    const sessionConfig = getSessionConfig();
    sequelizeStore.sync();
    return (0, express_session_1.default)(sessionConfig);
};
const appMiddlewares = [
    useURL,
    useSession()
];
exports.default = appMiddlewares;
