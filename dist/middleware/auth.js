"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = void 0;
exports.authenticate = authenticate;
exports.optionalAuth = optionalAuth;
exports.requireRole = requireRole;
const jwt_1 = require("../utils/jwt");
const AppError_1 = require("../utils/AppError");
function authenticate(req, _res, next) {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
        throw new AppError_1.AppError('Authentication required', 401);
    }
    try {
        req.user = (0, jwt_1.verifyAccessToken)(header.slice(7));
        next();
    }
    catch {
        throw new AppError_1.AppError('Invalid or expired token', 401);
    }
}
function optionalAuth(req, _res, next) {
    const header = req.headers.authorization;
    if (header?.startsWith('Bearer ')) {
        try {
            req.user = (0, jwt_1.verifyAccessToken)(header.slice(7));
        }
        catch {
            // silently ignore
        }
    }
    next();
}
function requireRole(...roles) {
    return (req, _res, next) => {
        if (!req.user)
            throw new AppError_1.AppError('Authentication required', 401);
        if (!roles.includes(req.user.role)) {
            throw new AppError_1.AppError('Insufficient permissions', 403);
        }
        next();
    };
}
exports.requireAdmin = requireRole('ADMIN');
//# sourceMappingURL=auth.js.map