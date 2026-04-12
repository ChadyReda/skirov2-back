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
exports.list = list;
exports.getOne = getOne;
exports.getById = getById;
exports.getFeatured = getFeatured;
exports.getNewArrivals = getNewArrivals;
exports.getRelated = getRelated;
exports.create = create;
exports.update = update;
exports.remove = remove;
exports.uploadImages = uploadImages;
const zod_1 = require("zod");
const productService = __importStar(require("../services/product.service"));
const AppError_1 = require("../utils/AppError");
const variantSchema = zod_1.z.object({
    sku: zod_1.z.string().min(1),
    size: zod_1.z.string().optional(),
    color: zod_1.z.string().optional(),
    colorHex: zod_1.z.string().optional(),
    stock: zod_1.z.coerce.number().int().min(0),
    additionalPrice: zod_1.z.coerce.number().min(0).default(0),
});
const productSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(200),
    sku: zod_1.z.string().optional(),
    description: zod_1.z.string().min(10),
    shortDescription: zod_1.z.string().min(5).max(500),
    categoryId: zod_1.z.string().min(1, 'Category is required'),
    brand: zod_1.z.string().optional(),
    price: zod_1.z.coerce.number().positive(),
    compareAtPrice: zod_1.z.coerce.number().positive().optional(),
    variants: zod_1.z.array(variantSchema).min(1),
    images: zod_1.z.array(zod_1.z.object({
        url: zod_1.z.string(),
        alt: zod_1.z.string().default(''),
        isPrimary: zod_1.z.boolean().default(false),
        sortOrder: zod_1.z.number().default(0),
    })).default([]),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
    isFeatured: zod_1.z.boolean().default(false),
    isNewArrival: zod_1.z.boolean().default(true),
    isActive: zod_1.z.boolean().default(true),
});
async function list(req, res) {
    const result = await productService.listProducts(req.query);
    res.json({ success: true, ...result });
}
async function getOne(req, res) {
    const product = await productService.getProductBySlug(req.params.slug);
    res.json({ success: true, data: product });
}
async function getById(req, res) {
    const product = await productService.getProductById(req.params.id);
    res.json({ success: true, data: product });
}
async function getFeatured(req, res) {
    const limit = parseInt(req.query.limit || '8');
    const products = await productService.getFeaturedProducts(limit);
    res.json({ success: true, data: products });
}
async function getNewArrivals(req, res) {
    const limit = parseInt(req.query.limit || '8');
    const products = await productService.getNewArrivals(limit);
    res.json({ success: true, data: products });
}
async function getRelated(req, res) {
    const product = await productService.getProductById(req.params.id);
    const related = await productService.getRelatedProducts(product.id, product.categoryId, 4);
    res.json({ success: true, data: related });
}
async function create(req, res) {
    try {
        console.log('CREATE PRODUCT BODY:', JSON.stringify(req.body, null, 2));
        const body = productSchema.parse(req.body);
        const product = await productService.createProduct(body);
        res.status(201).json({ success: true, data: product });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            console.error('CREATE PRODUCT VALIDATION ERROR:', JSON.stringify(error.issues, null, 2));
        }
        else {
            console.error('CREATE PRODUCT SERVICE ERROR:', error);
        }
        throw error;
    }
}
async function update(req, res) {
    const body = productSchema.partial().parse(req.body);
    const product = await productService.updateProduct(req.params.id, body);
    res.json({ success: true, data: product });
}
async function remove(req, res) {
    await productService.softDeleteProduct(req.params.id);
    res.json({ success: true, message: 'Product deactivated' });
}
async function uploadImages(req, res) {
    const files = req.files;
    if (!files?.length) {
        res.status(400).json({ success: false, message: 'No files provided' });
        return;
    }
    const { supabase } = await Promise.resolve().then(() => __importStar(require('../utils/supabase')));
    const urls = [];
    for (const file of files) {
        // Force clean extension based on mimetype
        const extMap = {
            'image/jpeg': '.jpg',
            'image/jpg': '.jpg',
            'image/png': '.png',
            'image/webp': '.webp',
        };
        const ext = extMap[file.mimetype] || '.jpg';
        const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        const filePath = `products/${filename}`;
        const { error } = await supabase.storage
            .from('images')
            .upload(filePath, file.buffer, {
            contentType: 'image/jpeg',
            upsert: false,
        });
        if (error) {
            console.error('Supabase upload error:', error);
            throw new AppError_1.AppError(`Failed to upload image: ${error.message}`, 500);
        }
        const { data } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);
        urls.push(data.publicUrl);
    }
    res.json({ success: true, data: { urls } });
}
//# sourceMappingURL=product.controller.js.map