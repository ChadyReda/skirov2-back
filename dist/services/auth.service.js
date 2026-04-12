"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.refreshTokens = refreshTokens;
exports.getMe = getMe;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../utils/prisma");
const AppError_1 = require("../utils/AppError");
const jwt_1 = require("../utils/jwt");
async function register(input) {
    const exists = await prisma_1.prisma.user.findUnique({
        where: { email: input.email.toLowerCase() },
    });
    if (exists)
        throw new AppError_1.AppError('Email already registered', 409);
    const passwordHash = await bcryptjs_1.default.hash(input.password, 12);
    const user = await prisma_1.prisma.user.create({
        data: {
            email: input.email.toLowerCase(),
            passwordHash,
            firstName: input.firstName,
            lastName: input.lastName,
        },
    });
    const payload = { userId: user.id, role: user.role };
    return { user, tokens: (0, jwt_1.makeTokenPair)(payload) };
}
async function login(input) {
    const user = await prisma_1.prisma.user.findUnique({
        where: { email: input.email.toLowerCase() },
    });
    if (!user)
        throw new AppError_1.AppError('Invalid email or password', 401);
    if (!user.isActive)
        throw new AppError_1.AppError('Account suspended', 403);
    const valid = await bcryptjs_1.default.compare(input.password, user.passwordHash);
    if (!valid)
        throw new AppError_1.AppError('Invalid email or password', 401);
    const payload = { userId: user.id, role: user.role };
    return { user, tokens: (0, jwt_1.makeTokenPair)(payload) };
}
async function refreshTokens(token) {
    let payload;
    try {
        payload = (0, jwt_1.verifyRefreshToken)(token);
    }
    catch {
        throw new AppError_1.AppError('Invalid refresh token', 401);
    }
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: payload.userId },
    });
    if (!user || !user.isActive) {
        throw new AppError_1.AppError('User not found', 401);
    }
    return (0, jwt_1.makeTokenPair)({ userId: user.id, role: user.role });
}
async function getMe(userId) {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
        include: { addresses: true },
    });
    if (!user)
        throw new AppError_1.AppError('User not found', 404);
    return user;
}
//# sourceMappingURL=auth.service.js.map