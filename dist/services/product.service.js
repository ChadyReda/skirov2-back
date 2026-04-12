"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProducts = listProducts;
exports.getProductBySlug = getProductBySlug;
exports.getProductById = getProductById;
exports.getFeaturedProducts = getFeaturedProducts;
exports.getNewArrivals = getNewArrivals;
exports.getRelatedProducts = getRelatedProducts;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.softDeleteProduct = softDeleteProduct;
const slugify_1 = __importDefault(require("slugify"));
const prisma_1 = require("../utils/prisma");
const AppError_1 = require("../utils/AppError");
const pagination_1 = require("../utils/pagination");
async function listProducts(query) {
    const { page, limit, skip } = (0, pagination_1.parsePage)(query);
    console.log('LIST PRODUCTS QUERY:', query);
    const where = {};
    if (query.all !== 'true') {
        where.isActive = true;
    }
    if (query.category) {
        const cat = await prisma_1.prisma.category.findFirst({
            where: { slug: query.category },
        });
        console.log('FOUND CATEGORY:', cat);
        if (!cat)
            return (0, pagination_1.paginate)([], 0, page, limit);
        where.categoryId = cat.id;
    }
    console.log('FINAL WHERE:', JSON.stringify(where, null, 2));
    if (query.search) {
        where.OR = [
            { name: { contains: query.search, mode: 'insensitive' } },
            { description: { contains: query.search, mode: 'insensitive' } },
            { shortDescription: { contains: query.search, mode: 'insensitive' } },
        ];
    }
    if (query.minPrice || query.maxPrice) {
        where.price = {};
        if (query.minPrice)
            where.price.gte = parseFloat(query.minPrice);
        if (query.maxPrice)
            where.price.lte = parseFloat(query.maxPrice);
    }
    if (query.sizes) {
        const sizes = query.sizes.split(',').map((s) => s.trim());
        where.variants = { some: { size: { in: sizes } } };
    }
    if (query.colors) {
        const colors = query.colors.split(',').map((c) => c.trim());
        where.variants = { some: { color: { in: colors } } };
    }
    if (query.featured === 'true')
        where.isFeatured = true;
    if (query.newArrival === 'true')
        where.isNewArrival = true;
    let orderBy = { createdAt: 'desc' };
    switch (query.sort) {
        case 'price_asc':
            orderBy = { price: 'asc' };
            break;
        case 'price_desc':
            orderBy = { price: 'desc' };
            break;
        case 'popular':
            orderBy = { totalSold: 'desc' };
            break;
        case 'rating':
            orderBy = { averageRating: 'desc' };
            break;
        case 'oldest':
            orderBy = { createdAt: 'asc' };
            break;
    }
    const [products, total] = await prisma_1.prisma.$transaction([
        prisma_1.prisma.product.findMany({
            where,
            orderBy,
            skip,
            take: limit,
            include: {
                category: { select: { id: true, name: true, slug: true } },
                images: true,
                variants: true,
            },
        }),
        prisma_1.prisma.product.count({ where }),
    ]);
    return (0, pagination_1.paginate)(products, total, page, limit);
}
async function getProductBySlug(slug) {
    const product = await prisma_1.prisma.product.findFirst({
        where: { slug, isActive: true },
        include: {
            category: { select: { id: true, name: true, slug: true } },
            images: true,
            variants: true,
        },
    });
    if (!product)
        throw (0, AppError_1.notFound)('Product');
    return product;
}
async function getProductById(id) {
    const product = await prisma_1.prisma.product.findUnique({
        where: { id },
        include: {
            category: { select: { id: true, name: true, slug: true } },
            images: true,
            variants: true,
        },
    });
    if (!product)
        throw (0, AppError_1.notFound)('Product');
    return product;
}
async function getFeaturedProducts(limit = 8) {
    return prisma_1.prisma.product.findMany({
        where: { isFeatured: true, isActive: true },
        orderBy: { totalSold: 'desc' },
        take: limit,
        include: {
            category: { select: { id: true, name: true, slug: true } },
            images: true,
            variants: true,
        },
    });
}
async function getNewArrivals(limit = 8) {
    return prisma_1.prisma.product.findMany({
        where: { isNewArrival: true, isActive: true },
        orderBy: { createdAt: 'desc' },
        take: limit,
        include: {
            category: { select: { id: true, name: true, slug: true } },
            images: true,
            variants: true,
        },
    });
}
async function getRelatedProducts(productId, categoryId, limit = 4) {
    return prisma_1.prisma.product.findMany({
        where: {
            id: { not: productId },
            categoryId,
            isActive: true,
        },
        take: limit,
        include: {
            category: { select: { id: true, name: true, slug: true } },
            images: true,
            variants: true,
        },
    });
}
async function createProduct(data) {
    const slug = (0, slugify_1.default)(data.name, { lower: true, strict: true });
    const sku = data.sku || `SKU-${Date.now()}`;
    const { variants, images, tags, ...rest } = data;
    return prisma_1.prisma.product.create({
        data: {
            ...rest,
            slug,
            sku,
            tags: tags || [],
            images: {
                create: images || [],
            },
            variants: {
                create: variants || [],
            },
        },
        include: {
            category: { select: { id: true, name: true, slug: true } },
            images: true,
            variants: true,
        },
    });
}
async function updateProduct(id, data) {
    const { variants, images, tags, ...rest } = data;
    if (rest.name) {
        rest.slug = (0, slugify_1.default)(rest.name, { lower: true, strict: true });
    }
    return prisma_1.prisma.product.update({
        where: { id },
        data: {
            ...rest,
            ...(tags && { tags }),
            ...(images && {
                images: {
                    deleteMany: {},
                    create: images,
                },
            }),
            ...(variants && {
                variants: {
                    deleteMany: {
                        NOT: variants.map((v) => ({ sku: v.sku })),
                    },
                    upsert: variants.map((v) => ({
                        where: { sku: v.sku },
                        update: v,
                        create: v,
                    })),
                },
            }),
        },
        include: {
            category: { select: { id: true, name: true, slug: true } },
            images: true,
            variants: true,
        },
    });
}
async function softDeleteProduct(id) {
    return prisma_1.prisma.product.update({
        where: { id },
        data: { isActive: false },
    });
}
//# sourceMappingURL=product.service.js.map