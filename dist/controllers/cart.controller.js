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
exports.getCart = getCart;
exports.addItem = addItem;
exports.updateItem = updateItem;
exports.removeItem = removeItem;
exports.clearCart = clearCart;
const zod_1 = require("zod");
const cartService = __importStar(require("../services/cart.service"));
const addItemSchema = zod_1.z.object({
    productId: zod_1.z.string().min(1),
    variantSku: zod_1.z.string().min(1),
    quantity: zod_1.z.coerce.number().int().min(1).default(1),
});
const updateSchema = zod_1.z.object({
    quantity: zod_1.z.coerce.number().int().min(1),
});
async function getCart(req, res) {
    const cart = await cartService.getCart(req.user.userId);
    res.json({ success: true, data: cart });
}
async function addItem(req, res) {
    console.log('ADD TO CART BODY:', req.body);
    const { productId, variantSku, quantity } = addItemSchema.parse(req.body);
    const cart = await cartService.addItem(req.user.userId, productId, variantSku, quantity);
    res.json({ success: true, data: cart });
}
async function updateItem(req, res) {
    const { quantity } = updateSchema.parse(req.body);
    const cart = await cartService.updateItem(req.user.userId, req.params.sku, quantity);
    res.json({ success: true, data: cart });
}
async function removeItem(req, res) {
    const cart = await cartService.removeItem(req.user.userId, req.params.sku);
    res.json({ success: true, data: cart });
}
async function clearCart(req, res) {
    await cartService.clearCart(req.user.userId);
    res.json({ success: true, message: 'Cart cleared' });
}
//# sourceMappingURL=cart.controller.js.map