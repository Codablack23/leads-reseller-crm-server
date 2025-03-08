"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnAuthorizedError = exports.BadRequest = exports.NotFoundError = exports.AppError = void 0;
class AppError extends Error {
    constructor(status, httpCode, description) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.status = status;
        this.httpCode = httpCode;
        Error.captureStackTrace(this);
    }
}
exports.AppError = AppError;
class NotFoundError extends Error {
    constructor(description) {
        super(description);
        this.status = 404;
        this.httpCode = "Not Found";
        Object.setPrototypeOf(this, new.target.prototype);
        // Error.captureStackTrace(this);
    }
}
exports.NotFoundError = NotFoundError;
class BadRequest extends Error {
    constructor(description, errors) {
        super(description);
        this.status = 400;
        this.httpCode = "Bad Request";
        Object.setPrototypeOf(this, new.target.prototype);
        this.errors = errors;
        Error.captureStackTrace(this);
    }
}
exports.BadRequest = BadRequest;
class UnAuthorizedError extends Error {
    constructor(description) {
        super(description);
        this.status = 401;
        this.httpCode = "Unauthorized";
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}
exports.UnAuthorizedError = UnAuthorizedError;
