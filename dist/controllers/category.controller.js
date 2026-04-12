"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = list;
exports.listAll = listAll;
exports.getBySlug = getBySlug;
exports.create = create;
exports.update = update;
exports.remove = remove;
const zod_1 = require("zod");
const slugify_1 = __importDefault(require("slugify"));
const prisma_1 = require("../utils/prisma");
const AppError_1 = require("../utils/AppError");
const categorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    parentId: zod_1.z.string().nullable().optional(),
    description: zod_1.z.string().optional(),
    imageUrl: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().default(true),
    sortOrder: zod_1.z.number().int().default(0),
});
async function list(_req, res) {
    const categories = await prisma_1.prisma.category.findMany({
        where: { isActive: true },
        include: { parent: { select: { id: true, name: true, slug: true } } },
        orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
    res.json({ success: true, data: categories });
}
async function listAll(_req, res) {
    const categories = await prisma_1.prisma.category.findMany({
        include: { parent: { select: { id: true, name: true, slug: true } } },
        orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
    res.json({ success: true, data: categories });
}
async function getBySlug(req, res) {
    const cat = await prisma_1.prisma.category.findFirst({
        where: { slug: req.params.slug, isActive: true },
        include: { parent: { select: { id: true, name: true, slug: true } } },
    });
    if (!cat)
        throw (0, AppError_1.notFound)('Category');
    res.json({ success: true, data: cat });
}
async function create(req, res) {
    const body = categorySchema.parse(req.body);
    const slug = (0, slugify_1.default)(body.name, { lower: true, strict: true });
    const cat = await prisma_1.prisma.category.create({
        data: { ...body, slug },
    });
    res.status(201).json({ success: true, data: cat });
}
async function update(req, res) {
    const body = categorySchema.partial().parse(req.body);
    if (body.name) {
        body.slug = (0, slugify_1.default)(body.name, { lower: true, strict: true });
    }
    const cat = await prisma_1.prisma.category.update({
        where: { id: req.params.id },
        data: body,
    });
    if (!cat)
        throw (0, AppError_1.notFound)('Category');
    res.json({ success: true, data: cat });
}
async function remove(req, res) {
    await prisma_1.prisma.category.update({
        where: { id: req.params.id },
        data: { isActive: false },
    });
    res.json({ success: true, message: 'Category deactivated' });
}
//# sourceMappingURL=category.controller.js.map