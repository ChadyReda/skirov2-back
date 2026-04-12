"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCart = getCart;
exports.addItem = addItem;
exports.updateItem = updateItem;
exports.removeItem = removeItem;
exports.clearCart = clearCart;
const prisma_1 = require("../utils/prisma");
const AppError_1 = require("../utils/AppError");
const INCLUDE = {
    items: {
        include: {
            product: {
                include: {
                    images: true,
                    variants: true,
                    category: { select: { id: true, name: true, slug: true } },
                },
            },
            variant: true,
        },
    },
};
async function getCart(userId) {
    let cart = await prisma_1.prisma.cart.findUnique({
        where: { userId },
        include: INCLUDE,
    });
    if (!cart) {
        cart = await prisma_1.prisma.cart.create({
            data: { userId },
            include: INCLUDE,
        });
    }
    return cart;
}
async function addItem(userId, productId, variantSku, quantity) {
    const product = await prisma_1.prisma.product.findUnique({
        where: { id: productId },
        include: { variants: true },
    });
    if (!product || !product.isActive) {
        throw new AppError_1.AppError('Product not available', 400);
    }
    const variant = product.variants.find((v) => v.sku === variantSku);
    if (!variant)
        throw new AppError_1.AppError('Variant not found', 400);
    if (variant.stock < quantity)
        throw new AppError_1.AppError('Insufficient stock', 400);
    let cart = await prisma_1.prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
        cart = await prisma_1.prisma.cart.create({ data: { userId } });
    }
    const existingItem = await prisma_1.prisma.cartItem.findFirst({
        where: { cartId: cart.id, productId, variantSku },
    });
    if (existingItem) {
        const newQty = existingItem.quantity + quantity;
        if (newQty > variant.stock)
            throw new AppError_1.AppError('Insufficient stock', 400);
        await prisma_1.prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: newQty },
        });
    }
    else {
        await prisma_1.prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId,
                variantSku,
                variantId: variant.id,
                quantity,
            },
        });
    }
    return prisma_1.prisma.cart.findUnique({
        where: { userId },
        include: INCLUDE,
    });
}
async function updateItem(userId, variantSku, quantity) {
    const cart = await prisma_1.prisma.cart.findUnique({ where: { userId } });
    if (!cart)
        throw new AppError_1.AppError('Cart not found', 404);
    const item = await prisma_1.prisma.cartItem.findFirst({
        where: { cartId: cart.id, variantSku },
    });
    if (!item)
        throw new AppError_1.AppError('Item not in cart', 404);
    const variant = await prisma_1.prisma.productVariant.findUnique({
        where: { sku: variantSku },
    });
    if (variant && variant.stock < quantity) {
        throw new AppError_1.AppError('Insufficient stock', 400);
    }
    await prisma_1.prisma.cartItem.update({
        where: { id: item.id },
        data: { quantity },
    });
    return prisma_1.prisma.cart.findUnique({
        where: { userId },
        include: INCLUDE,
    });
}
async function removeItem(userId, variantSku) {
    const cart = await prisma_1.prisma.cart.findUnique({ where: { userId } });
    if (!cart)
        throw new AppError_1.AppError('Cart not found', 404);
    await prisma_1.prisma.cartItem.deleteMany({
        where: { cartId: cart.id, variantSku },
    });
    return prisma_1.prisma.cart.findUnique({
        where: { userId },
        include: INCLUDE,
    });
}
async function clearCart(userId) {
    const cart = await prisma_1.prisma.cart.findUnique({ where: { userId } });
    if (!cart)
        return;
    await prisma_1.prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
    });
}
//# sourceMappingURL=cart.service.js.map