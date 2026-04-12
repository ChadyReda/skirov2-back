"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const product_routes_1 = __importDefault(require("./product.routes"));
const category_routes_1 = __importDefault(require("./category.routes"));
const cart_routes_1 = __importDefault(require("./cart.routes"));
const order_routes_1 = __importDefault(require("./order.routes"));
const profile_routes_1 = __importDefault(require("./profile.routes"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
const review_routes_1 = __importDefault(require("./review.routes"));
const wishlist_routes_1 = __importDefault(require("./wishlist.routes"));
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/products', product_routes_1.default);
router.use('/categories', category_routes_1.default);
router.use('/cart', cart_routes_1.default);
router.use('/orders', order_routes_1.default);
router.use('/profile', profile_routes_1.default);
router.use('/admin', admin_routes_1.default);
router.use('/wishlist', wishlist_routes_1.default);
router.use('', review_routes_1.default);
router.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'Elara API',
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map