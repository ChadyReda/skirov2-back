"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const prisma_1 = require("../utils/prisma");
const AppError_1 = require("../utils/AppError");
const zod_1 = require("zod");
const r = (0, express_1.Router)();
const reviewSchema = zod_1.z.object({
    rating: zod_1.z.number().int().min(1).max(5),
    title: zod_1.z.string().min(1).max(100),
    body: zod_1.z.string().min(10).max(1000),
});
// Get reviews for a product
r.get('/products/:productId/reviews', async (req, res) => {
    const reviews = await prisma_1.prisma.review.findMany({
        where: { productId: req.params.productId, isApproved: true },
        include: { user: { select: { firstName: true, lastName: true } } },
        orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: reviews });
});
// Create a review (only buyers)
r.post('/products/:productId/reviews', auth_1.authenticate, async (req, res) => {
    const userId = req.user.userId;
    const productId = req.params.productId;
    // Check if user has ordered this product
    const order = await prisma_1.prisma.order.findFirst({
        where: {
            userId,
            status: { in: ['DELIVERED', 'CONFIRMED', 'SHIPPED'] },
            items: { some: { productId } },
        },
    });
    if (!order) {
        throw new AppError_1.AppError('You can only review products you have purchased', 403);
    }
    // Check if already reviewed
    const existing = await prisma_1.prisma.review.findFirst({
        where: { userId, productId },
    });
    if (existing) {
        throw new AppError_1.AppError('You have already reviewed this product', 409);
    }
    const body = reviewSchema.parse(req.body);
    const review = await prisma_1.prisma.review.create({
        data: {
            ...body,
            userId,
            productId,
            isVerifiedPurchase: true,
        },
        include: { user: { select: { firstName: true, lastName: true } } },
    });
    // Update product average rating
    const stats = await prisma_1.prisma.review.aggregate({
        where: { productId, isApproved: true },
        _avg: { rating: true },
        _count: { rating: true },
    });
    await prisma_1.prisma.product.update({
        where: { id: productId },
        data: {
            averageRating: stats._avg.rating || 0,
            reviewCount: stats._count.rating,
        },
    });
    res.status(201).json({ success: true, data: review });
});
exports.default = r;
//# sourceMappingURL=review.routes.js.map