"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_color_1 = __importDefault(require("cli-color"));
const winston_1 = __importDefault(require("winston"));
class AppLogger {
    formatLogType(type = "info") {
        if (type == "error")
            return cli_color_1.default.red(type.toUpperCase);
        if (type == "success")
            return cli_color_1.default.green(type.toUpperCase());
        if (type === "info")
            return cli_color_1.default.yellow(type.toUpperCase());
        return cli_color_1.default.yellow(type.toUpperCase());
    }
    getLogDate() {
        return new Date().toISOString();
    }
    constructor() {
        const logger = winston_1.default.createLogger({
            level: 'info',
            format: winston_1.default.format.json(),
            transports: [
                new winston_1.default.transports.File({ filename: 'logs/error.log', level: 'error' }),
                new winston_1.default.transports.File({ filename: 'logs/app.log' })
            ],
        });
        this.logger = logger;
    }
    logDebug(head, m) {
        const logType = this.formatLogType("info");
        this.logger.info(m);
        const logDate = this.getLogDate();
        const title = head ? `[${head.toUpperCase()}]` : "";
        console.log(`[${logType}] - [${logDate}] - ${title} - ${m}`);
    }
}
exports.default = new AppLogger();
