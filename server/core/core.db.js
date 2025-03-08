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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = connectDB;
const mongoose_1 = require("mongoose");
const core_secrets_1 = require("./core.secrets");
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mongooseInstance = yield (0, mongoose_1.connect)(core_secrets_1.MONGODB_URI);
            return {
                instance: mongooseInstance,
                message: "Mongo DB Connected Successfully"
            };
        }
        catch (error) {
            throw error;
        }
    });
}
