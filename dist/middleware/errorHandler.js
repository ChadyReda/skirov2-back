"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
const AppError_1 = require("../utils/AppError");
const config_1 = require("../config");
function errorHandler(err, _req, res, _next) {
    // Zod validation errors
    if (err instanceof zod_1.ZodError) {
        res.status(422).json({
            success: false,
            message: 'Validation failed',
            errors: err.issues.map((e) => ({
                field: e.path.join('.') || '',
                message: e.message,
            })),
        });
        return;
    }
    // Known application errors
    if (err instanceof AppError_1.AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
        return;
    }
    // Prisma unique constraint violation
    const prismaErr = err;
    if (prismaErr?.code === 'P2002') {
        const field = prismaErr.meta?.target?.[0] || 'field';
        res.status(409).json({
            success: false,
            message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
        });
        return;
    }
    // Prisma record not found
    if (prismaErr?.code === 'P2025') {
        res.status(404).json({
            success: false,
            message: 'Record not found',
        });
        return;
    }
    // Unexpected errors
    console.error('[Unhandled Error]', err);
    res.status(500).json({
        success: false,
        message: config_1.config.isDev
            ? (err instanceof Error ? err.message : 'Internal server error')
            : 'Internal server error',
    });
}
//# sourceMappingURL=errorHandler.js.map