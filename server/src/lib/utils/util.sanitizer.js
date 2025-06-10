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
exports.SanitizerProvider = void 0;
class Sanitizer {
    /**
     * Deeply removes specified keys from the object.
     * @param obj The object to sanitize
     * @param paths An array of key paths (supports nested keys via dot notation)
     */
    sanitizeObject(obj, paths) {
        const result = structuredClone(obj); // deep clone
        for (const path of paths) {
            this.deleteKeyPath(result, path);
        }
        return result;
    }
    deleteKeyPath(obj, path) {
        const keys = path.split(".");
        let current = obj;
        for (let i = 0; i < keys.length - 1; i++) {
            if (typeof current[keys[i]] !== "object" || current[keys[i]] === null) {
                return; // invalid path
            }
            current = current[keys[i]];
        }
        delete current[keys[keys.length - 1]];
    }
    sanitizeEmptyObjectProp(obj) {
        const result = {};
        for (const key in obj) {
            if (!Object.prototype.hasOwnProperty.call(obj, key))
                continue;
            const value = obj[key];
            const isEmptyObject = typeof value === "object" &&
                value !== null &&
                !Array.isArray(value) &&
                Object.keys(value).length === 0;
            if (value !== undefined &&
                value !== null &&
                value !== "" &&
                !isEmptyObject) {
                result[key] = value;
            }
        }
        return result;
    }
    /**
     * Sanitize a specific property in an object using a provided serializer function.
     * @param obj The object to sanitize.
     * @param key The key of the property to sanitize.
     * @param serializer A function that transforms the value of the given key.
     * @returns A new object with the sanitized property.
     */
    sanitizeProperty(obj, key, serializer) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = Object.assign({}, obj);
            if (key in result && typeof serializer === 'function') {
                result[key] = yield serializer(result[key]);
            }
            return result;
        });
    }
}
exports.SanitizerProvider = new Sanitizer();
