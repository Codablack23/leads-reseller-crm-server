"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationUtility = exports.SanitizerProvider = void 0;
var util_sanitizer_1 = require("./util.sanitizer");
Object.defineProperty(exports, "SanitizerProvider", { enumerable: true, get: function () { return util_sanitizer_1.SanitizerProvider; } });
var utils_pagination_1 = require("./utils.pagination");
Object.defineProperty(exports, "PaginationUtility", { enumerable: true, get: function () { return __importDefault(utils_pagination_1).default; } });
