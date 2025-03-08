"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAppConfig = runAppConfig;
const express_1 = __importDefault(require("express"));
const core_routing_1 = __importDefault(require("./core.routing"));
const core_middleware_1 = __importDefault(require("./core.middleware"));
const core_secrets_1 = require("./core.secrets");
const core_logs_1 = __importDefault(require("./core.logs"));
const app = (0, express_1.default)();
function runAppConfig() {
    // connectDB().then((db)=>console.log(db.message))
    //configuration for setting up core middleware from the core.middleware.js folder
    core_middleware_1.default.forEach(middleware => {
        app.use(middleware);
    });
    app.use(express_1.default.static("public"));
    app.use(express_1.default.json());
    //setup routes from registered routes from the core.routing.js
    app.use(core_routing_1.default);
    const startServer = () => {
        app.listen(core_secrets_1.PORT || 5501, () => {
            core_logs_1.default.logDebug("init", `Server Started and runinng at http://localhost:${core_secrets_1.PORT || 5501}/`);
        });
    };
    return {
        app,
        startServer
    };
}
