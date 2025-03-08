"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppResponse {
    static sendOkResponse(res, responseData, message) {
        res
            .status(200)
            .json({
            status: "success",
            data: responseData,
            message,
        });
    }
    static sendErrorResponse(res, status, message) {
        res
            .status(status)
            .json({
            status: "error",
            message,
            data: null
        });
    }
    static sendFailedResponse(res, status, errors, message) {
        res
            .status(status)
            .json({
            status: "failed",
            errors,
            message,
            data: null
        });
    }
    static sendBadRequestResponse(res, errors, message) {
        res
            .status(400)
            .json({
            status: "failed",
            errors,
            message,
            data: null
        });
    }
}
exports.default = AppResponse;
