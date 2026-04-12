"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function required(key) {
    const v = process.env[key];
    if (!v)
        throw new Error(`Missing required env var: ${key}`);
    return v;
}
exports.config = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '5000', 10),
    databaseUrl: required('DATABASE_URL'),
    jwt: {
        accessSecret: required('JWT_ACCESS_SECRET'),
        refreshSecret: required('JWT_REFRESH_SECRET'),
        accessExpires: process.env.JWT_ACCESS_EXPIRES || '15m',
        refreshExpires: process.env.JWT_REFRESH_EXPIRES || '7d',
    },
    clientOrigin: process.env.CLIENT_ORIGIN || 'https://website-frontend-skiro.vercel.app',
    uploadDir: process.env.UPLOAD_DIR || 'uploads',
    maxFileSizeMb: parseInt(process.env.MAX_FILE_SIZE_MB || '5', 10),
    supabaseUrl: required('SUPABASE_URL'),
    supabaseAnonKey: required('SUPABASE_ANON_KEY'),
    supabaseServiceRoleKey: required('SUPABASE_SERVICE_ROLE_KEY'),
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',
};
//# sourceMappingURL=index.js.map