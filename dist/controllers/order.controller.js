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
exports.create = create;
exports.myOrders = myOrders;
exports.getOne = getOne;
exports.adminList = adminList;
exports.updateStatus = updateStatus;
const zod_1 = require("zod");
const orderService = __importStar(require("../services/order.service"));
const addressSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    phone: zod_1.z.string().optional(),
    street: zod_1.z.string().min(1),
    apartment: zod_1.z.string().optional(),
    city: zod_1.z.string().min(1),
    state: zod_1.z.string().min(1),
    zip: zod_1.z.string().min(1),
    country: zod_1.z.string().min(2).default('US'),
});
const createOrderSchema = zod_1.z.object({
    guestEmail: zod_1.z.string().email().optional(),
    items: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string().min(1),
        variantSku: zod_1.z.string().min(1),
        quantity: zod_1.z.number().int().min(1),
    })).min(1, 'Order must have at least one item'),
    shippingAddress: addressSchema,
    paymentMethod: zod_1.z.string().default('card'),
    couponCode: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
});
async function create(req, res) {
    const body = createOrderSchema.parse(req.body);
    const order = await orderService.createOrder({
        ...body,
        userId: req.user?.userId,
    });
    res.status(201).json({ success: true, data: order });
}
async function myOrders(req, res) {
    const result = await orderService.getUserOrders(req.user.userId, req.query);
    res.json({ success: true, ...result });
}
async function getOne(req, res) {
    const order = await orderService.getOrderById(req.params.id, req.user?.userId);
    res.json({ success: true, data: order });
}
async function adminList(req, res) {
    const result = await orderService.adminListOrders(req.query);
    res.json({ success: true, ...result });
}
async function updateStatus(req, res) {
    const { status } = zod_1.z.object({
        status: zod_1.z.enum([
            'PENDING',
            'CONFIRMED',
            'PROCESSING',
            'SHIPPED',
            'DELIVERED',
            'CANCELLED',
        ]),
    }).parse(req.body);
    const order = await orderService.updateOrderStatus(req.params.id, status);
    res.json({ success: true, data: order });
}
//# sourceMappingURL=order.controller.js.map