"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const AppError_1 = require("../utils/AppError");
const ALLOWED_MIME = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];
// Use memory storage instead of disk
const storage = multer_1.default.memoryStorage();
function fileFilter(_req, file, cb) {
    if (ALLOWED_MIME.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new AppError_1.AppError('Only JPEG, PNG and WebP images are allowed', 400));
    }
}
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});
//# sourceMappingURL=upload.js.map