"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badRequest = exports.conflict = exports.forbidden = exports.unauthorized = exports.notFound = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 400, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, AppError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const notFound = (r = 'Resource') => new AppError(`${r} not found`, 404);
exports.notFound = notFound;
const unauthorized = (msg = 'Unauthorized') => new AppError(msg, 401);
exports.unauthorized = unauthorized;
const forbidden = (msg = 'Forbidden') => new AppError(msg, 403);
exports.forbidden = forbidden;
const conflict = (msg) => new AppError(msg, 409);
exports.conflict = conflict;
const badRequest = (msg) => new AppError(msg, 400);
exports.badRequest = badRequest;
//# sourceMappingURL=AppError.js.map