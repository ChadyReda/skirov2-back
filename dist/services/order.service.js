"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = createOrder;
exports.getUserOrders = getUserOrders;
exports.getOrderById = getOrderById;
exports.adminListOrders = adminListOrders;
exports.updateOrderStatus = updateOrderStatus;
const prisma_1 = require("../utils/prisma");
const AppError_1 = require("../utils/AppError");
const pagination_1 = require("../utils/pagination");
const orderNumber_1 = require("../utils/orderNumber");
const FREE_SHIPPING_AT = 100;
const SHIPPING_COST = 9.99;
const TAX_RATE = 0.08;
const ORDER_INCLUDE = {
    items: true,
    shippingAddress: true,
    user: {
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
        },
    },
};
async function createOrder(input) {
    if (!input.userId && !input.guestEmail) {
        throw new AppError_1.AppError('Guest email is required for guest checkout', 400);
    }
    // Validate items and build order items
    const orderItems = await Promise.all(input.items.map(async ({ productId, variantSku, quantity }) => {
        const product = await prisma_1.prisma.product.findUnique({
            where: { id: productId },
            include: { images: true, variants: true },
        });
        if (!product || !product.isActive) {
            throw new AppError_1.AppError(`Product not available: ${productId}`, 400);
        }
        const variant = product.variants.find((v) => v.sku === variantSku);
        if (!variant)
            throw new AppError_1.AppError(`Variant ${variantSku} not found`, 400);
        if (variant.stock < quantity) {
            throw new AppError_1.AppError(`Only ${variant.stock} units of "${product.name}" in stock`, 400);
        }
        const primaryImage = product.images.find((i) => i.isPrimary)?.url ||
            product.images[0]?.url ||
            '';
        const variantParts = [variant.size, variant.color].filter(Boolean);
        return {
            productId,
            name: product.name,
            image: primaryImage,
            price: Number(product.price) + Number(variant.additionalPrice),
            quantity,
            variantSku,
            variantLabel: variantParts.join(' / ') || variantSku,
            _variantId: variant.id,
        };
    }));
    // Calculate totals
    const subtotal = +orderItems.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2);
    const shippingCost = subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_COST;
    const tax = +(subtotal * TAX_RATE).toFixed(2);
    const total = +(subtotal + shippingCost + tax).toFixed(2);
    // Create order in transaction
    const order = await prisma_1.prisma.$transaction(async (tx) => {
        // Deduct stock
        await Promise.all(orderItems.map(({ _variantId, quantity }) => tx.productVariant.update({
            where: { id: _variantId },
            data: { stock: { decrement: quantity } },
        })));
        // Update totalSold
        await Promise.all(input.items.map(({ productId, quantity }) => tx.product.update({
            where: { id: productId },
            data: { totalSold: { increment: quantity } },
        })));
        // Create order
        const newOrder = await tx.order.create({
            data: {
                orderNumber: (0, orderNumber_1.generateOrderNumber)(),
                userId: input.userId || null,
                guestEmail: input.guestEmail,
                subtotal,
                shippingCost,
                tax,
                discount: 0,
                total,
                paymentMethod: input.paymentMethod || 'card',
                paymentStatus: 'PAID',
                status: 'PENDING',
                couponCode: input.couponCode,
                notes: input.notes,
                shippingAddress: {
                    create: input.shippingAddress,
                },
                items: {
                    create: orderItems.map(({ _variantId: _, ...item }) => item),
                },
            },
            include: ORDER_INCLUDE,
        });
        // Clear cart
        if (input.userId) {
            const cart = await tx.cart.findUnique({
                where: { userId: input.userId },
            });
            if (cart) {
                await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
            }
        }
        return newOrder;
    });
    return order;
}
async function getUserOrders(userId, query) {
    const { page, limit, skip } = (0, pagination_1.parsePage)(query);
    const [orders, total] = await prisma_1.prisma.$transaction([
        prisma_1.prisma.order.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
            include: ORDER_INCLUDE,
        }),
        prisma_1.prisma.order.count({ where: { userId } }),
    ]);
    return (0, pagination_1.paginate)(orders, total, page, limit);
}
async function getOrderById(id, userId) {
    const order = await prisma_1.prisma.order.findUnique({
        where: { id },
        include: ORDER_INCLUDE,
    });
    if (!order)
        throw (0, AppError_1.notFound)('Order');
    if (userId && order.userId !== userId) {
        throw new AppError_1.AppError('Forbidden', 403);
    }
    return order;
}
async function adminListOrders(query) {
    const { page, limit, skip } = (0, pagination_1.parsePage)(query);
    const where = {};
    if (query.status)
        where.status = query.status;
    if (query.search) {
        where.OR = [
            { orderNumber: { contains: query.search, mode: 'insensitive' } },
            { guestEmail: { contains: query.search, mode: 'insensitive' } },
        ];
    }
    const [orders, total] = await prisma_1.prisma.$transaction([
        prisma_1.prisma.order.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
            include: ORDER_INCLUDE,
        }),
        prisma_1.prisma.order.count({ where }),
    ]);
    return (0, pagination_1.paginate)(orders, total, page, limit);
}
async function updateOrderStatus(id, status) {
    const order = await prisma_1.prisma.order.findUnique({
        where: { id },
    });
    if (!order) {
        throw (0, AppError_1.notFound)('Order');
    }
    return prisma_1.prisma.order.update({
        where: { id },
        data: { status },
        include: ORDER_INCLUDE,
    });
}
//# sourceMappingURL=order.service.js.map