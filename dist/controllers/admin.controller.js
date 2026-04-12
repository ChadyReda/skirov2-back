"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = getDashboardStats;
exports.listUsers = listUsers;
exports.updateUserRole = updateUserRole;
exports.updateUserStatus = updateUserStatus;
const zod_1 = require("zod");
const prisma_1 = require("../utils/prisma");
const AppError_1 = require("../utils/AppError");
const pagination_1 = require("../utils/pagination");
async function getDashboardStats(_req, res) {
    try {
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        // Execute queries sequentially to avoid prepared statement issues
        const totalUsers = await prisma_1.prisma.user.count({ where: { role: 'CUSTOMER', isActive: true } });
        const totalProducts = await prisma_1.prisma.product.count({ where: { isActive: true } });
        const totalOrders = await prisma_1.prisma.order.count();
        const revenueResult = await prisma_1.prisma.order.aggregate({
            where: { paymentStatus: 'PAID' },
            _sum: { total: true },
        });
        const monthlyRevenueResult = await prisma_1.prisma.order.aggregate({
            where: { paymentStatus: 'PAID', createdAt: { gte: thirtyDaysAgo } },
            _sum: { total: true },
        });
        const weeklyOrders = await prisma_1.prisma.order.count({ where: { createdAt: { gte: sevenDaysAgo } } });
        const recentOrders = await prisma_1.prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: {
                user: { select: { firstName: true, lastName: true, email: true } },
                shippingAddress: true,
                items: true,
            },
        });
        const topProducts = await prisma_1.prisma.product.findMany({
            where: { isActive: true },
            orderBy: { totalSold: 'desc' },
            take: 5,
            include: { images: true },
        });
        const ordersByStatus = await prisma_1.prisma.order.groupBy({
            by: ['status'],
            _count: { status: true },
        });
        const lowStockProducts = await prisma_1.prisma.product.findMany({
            where: {
                isActive: true,
                variants: { some: { stock: { lte: 5 } } },
            },
            include: { variants: true, images: true },
            take: 10,
        });
        res.json({
            success: true,
            data: {
                overview: {
                    totalUsers,
                    totalProducts,
                    totalOrders,
                    totalRevenue: Number(revenueResult._sum.total || 0),
                    monthlyRevenue: Number(monthlyRevenueResult._sum.total || 0),
                    weeklyOrders,
                },
                recentOrders,
                topProducts,
                ordersByStatus: ordersByStatus.reduce((acc, { status, _count }) => {
                    acc[status] = _count.status;
                    return acc;
                }, {}),
                lowStockProducts,
            },
        });
    }
    catch (error) {
        console.error('Dashboard stats error:', error);
        throw new AppError_1.AppError('Failed to load dashboard statistics', 500);
    }
}
async function listUsers(req, res) {
    const { page, limit, skip } = (0, pagination_1.parsePage)(req.query);
    const search = req.query.search || '';
    const where = {};
    if (search) {
        where.OR = [
            { email: { contains: search, mode: 'insensitive' } },
            { firstName: { contains: search, mode: 'insensitive' } },
            { lastName: { contains: search, mode: 'insensitive' } },
        ];
    }
    const [users, total] = await prisma_1.prisma.$transaction([
        prisma_1.prisma.user.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
        }),
        prisma_1.prisma.user.count({ where }),
    ]);
    res.json({ success: true, ...(0, pagination_1.paginate)(users, total, page, limit) });
}
async function updateUserRole(req, res) {
    const { role } = zod_1.z.object({
        role: zod_1.z.enum(['CUSTOMER', 'ADMIN']),
    }).parse(req.body);
    if (req.params.id === req.user.userId) {
        throw new AppError_1.AppError('Cannot change your own role', 400);
    }
    const user = await prisma_1.prisma.user.update({
        where: { id: req.params.id },
        data: { role },
    });
    if (!user)
        throw (0, AppError_1.notFound)('User');
    res.json({ success: true, data: user });
}
async function updateUserStatus(req, res) {
    const { isActive } = zod_1.z.object({
        isActive: zod_1.z.boolean(),
    }).parse(req.body);
    if (req.params.id === req.user.userId) {
        throw new AppError_1.AppError('Cannot deactivate your own account', 400);
    }
    const user = await prisma_1.prisma.user.update({
        where: { id: req.params.id },
        data: { isActive },
    });
    if (!user)
        throw (0, AppError_1.notFound)('User');
    res.json({ success: true, data: user });
}
//# sourceMappingURL=admin.controller.js.map