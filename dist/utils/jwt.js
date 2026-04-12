"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAccessToken = signAccessToken;
exports.signRefreshToken = signRefreshToken;
exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
exports.makeTokenPair = makeTokenPair;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function signAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, config_1.config.jwt.accessSecret, {
        expiresIn: config_1.config.jwt.accessExpires,
    });
}
function signRefreshToken(payload) {
    return jsonwebtoken_1.default.sign(payload, config_1.config.jwt.refreshSecret, {
        expiresIn: config_1.config.jwt.refreshExpires,
    });
}
function verifyAccessToken(token) {
    return jsonwebtoken_1.default.verify(token, config_1.config.jwt.accessSecret);
}
function verifyRefreshToken(token) {
    return jsonwebtoken_1.default.verify(token, config_1.config.jwt.refreshSecret);
}
function makeTokenPair(payload) {
    return {
        accessToken: signAccessToken(payload),
        refreshToken: signRefreshToken(payload),
    };
}
//# sourceMappingURL=jwt.js.map