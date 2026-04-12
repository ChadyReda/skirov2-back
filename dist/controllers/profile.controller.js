"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
exports.changePassword = changePassword;
exports.addAddress = addAddress;
exports.removeAddress = removeAddress;
const zod_1 = require("zod");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../utils/prisma");
const AppError_1 = require("../utils/AppError");
const updateProfileSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(50).optional(),
    lastName: zod_1.z.string().min(1).max(50).optional(),
    phone: zod_1.z.string().optional(),
});
const changePasswordSchema = zod_1.z.object({
    currentPassword: zod_1.z.string().min(1),
    newPassword: zod_1.z.string().min(8, 'New password must be at least 8 characters'),
});
const addressSchema = zod_1.z.object({
    label: zod_1.z.string().default('Home'),
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    phone: zod_1.z.string().optional(),
    street: zod_1.z.string().min(1),
    apartment: zod_1.z.string().optional(),
    city: zod_1.z.string().min(1),
    state: zod_1.z.string().min(1),
    zip: zod_1.z.string().min(1),
    country: zod_1.z.string().min(2).default('US'),
    isDefault: zod_1.z.boolean().default(false),
});
async function getProfile(req, res) {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: req.user.userId },
        include: { addresses: true },
    });
    if (!user)
        throw (0, AppError_1.notFound)('User');
    res.json({ success: true, data: user });
}
async function updateProfile(req, res) {
    const body = updateProfileSchema.parse(req.body);
    const user = await prisma_1.prisma.user.update({
        where: { id: req.user.userId },
        data: body,
        include: { addresses: true },
    });
    res.json({ success: true, data: user });
}
async function changePassword(req, res) {
    const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: req.user.userId },
    });
    if (!user)
        throw (0, AppError_1.notFound)('User');
    const valid = await bcryptjs_1.default.compare(currentPassword, user.passwordHash);
    if (!valid)
        throw new AppError_1.AppError('Current password is incorrect', 400);
    const passwordHash = await bcryptjs_1.default.hash(newPassword, 12);
    await prisma_1.prisma.user.update({
        where: { id: req.user.userId },
        data: { passwordHash },
    });
    res.json({ success: true, message: 'Password updated' });
}
async function addAddress(req, res) {
    const body = addressSchema.parse(req.body);
    if (body.isDefault) {
        await prisma_1.prisma.address.updateMany({
            where: { userId: req.user.userId },
            data: { isDefault: false },
        });
    }
    await prisma_1.prisma.address.create({
        data: { ...body, userId: req.user.userId },
    });
    const addresses = await prisma_1.prisma.address.findMany({
        where: { userId: req.user.userId },
    });
    res.status(201).json({ success: true, data: addresses });
}
async function removeAddress(req, res) {
    await prisma_1.prisma.address.delete({
        where: { id: req.params.addressId },
    });
    const addresses = await prisma_1.prisma.address.findMany({
        where: { userId: req.user.userId },
    });
    res.json({ success: true, data: addresses });
}
//# sourceMappingURL=profile.controller.js.map