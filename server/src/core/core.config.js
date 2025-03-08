"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.runAppConfig = runAppConfig;
const express_1 = __importDefault(require("express"));
const core_routing_1 = __importDefault(require("./core.routing"));
const core_middleware_1 = __importStar(require("./core.middleware"));
const core_secrets_1 = require("./core.secrets");
const core_logger_1 = __importDefault(require("./core.logger"));
const core_error_1 = require("./core.error");
const core_db_1 = require("./core.db");
const cors_1 = __importDefault(require("cors"));
const index_1 = require("../common/constants/index");
const expressApp = (0, express_1.default)();
function runAppConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        yield core_db_1.AppDataSource.initialize();
        //configuration for setting up core middleware from the core.middleware.js file
        expressApp.use((0, cors_1.default)({
            credentials: true,
            origin: index_1.whitelist,
            methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
        }));
        core_middleware_1.default.forEach(middleware => {
            expressApp.use(middleware);
        });
        expressApp.use(express_1.default.static("public"));
        expressApp.use(express_1.default.json());
        //setup routes from registered routes from the core.routing.js
        expressApp.use(core_routing_1.default);
        expressApp.use("*", (req, res, next) => {
            const err = new core_error_1.NotFoundError(`Not found - ${req.url}`);
            next(err);
        });
        expressApp.use(core_middleware_1.useError);
        const startServer = () => {
            expressApp.listen(core_secrets_1.PORT || 5501, () => {
                core_logger_1.default.logDebug("init", `Server Started and runinng at http://localhost:${core_secrets_1.PORT || 5501}/`);
            });
        };
        return {
            expressApp,
            startServer
        };
    });
}
