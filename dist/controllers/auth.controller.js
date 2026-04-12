"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.logout = logout;
exports.refresh = refresh;
exports.me = me;
const zod_1 = require("zod");
const authService = __importStar(require("../services/auth.service"));
const config_1 = require("../config");
const COOKIE_OPTS = {
    httpOnly: true,
    secure: config_1.config.isProd,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
};
const registerSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email'),
    password: zod_1.z.string().min(8, 'Password must be at least 8 characters'),
    firstName: zod_1.z.string().min(1).max(50),
    lastName: zod_1.z.string().min(1).max(50),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1),
});
async function register(req, res) {
    const body = registerSchema.parse(req.body);
    const { user, tokens } = await authService.register(body);
    res.cookie('refreshToken', tokens.refreshToken, COOKIE_OPTS);
    res.status(201).json({
        success: true,
        data: {
            user,
            accessToken: tokens.accessToken,
        },
    });
}
async function login(req, res) {
    const body = loginSchema.parse(req.body);
    const { user, tokens } = await authService.login(body);
    console.log(body);
    res.cookie('refreshToken', tokens.refreshToken, COOKIE_OPTS);
    res.json({
        success: true,
        data: {
            user,
            accessToken: tokens.accessToken,
        },
    });
}
async function logout(_req, res) {
    res.clearCookie('refreshToken');
    res.json({ success: true, message: 'Logged out successfully' });
}
async function refresh(req, res) {
    const token = req.cookies?.refreshToken;
    if (!token) {
        res.status(401).json({
            success: false,
            message: 'No refresh token provided',
        });
        return;
    }
    const tokens = await authService.refreshTokens(token);
    res.cookie('refreshToken', tokens.refreshToken, COOKIE_OPTS);
    res.json({
        success: true,
        data: { accessToken: tokens.accessToken },
    });
}
async function me(req, res) {
    const user = await authService.getMe(req.user.userId);
    res.json({ success: true, data: { user } });
}
//# sourceMappingURL=auth.controller.js.map