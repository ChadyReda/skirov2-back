"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const prisma_1 = require("../utils/prisma");
const r = (0, express_1.Router)();
r.use(auth_1.authenticate);
// Get wishlist
r.get('/', async (req, res) => {
    try {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: req.user.userId },
            include: { wishlist: true },
        });
        res.json({ success: true, data: user?.wishlist || [] });
    }
    catch (error) {
        console.error('Failed to get wishlist:', error);
        res.status(500).json({ success: false, message: 'Failed to retrieve wishlist.' });
    }
});
// Add to wishlist
r.post('/:productId', async (req, res) => {
    try {
        await prisma_1.prisma.user.update({
            where: { id: req.user.userId },
            data: { wishlist: { connect: { id: req.params.productId } } },
        });
        res.json({ success: true, message: 'Added to wishlist' });
    }
    catch (error) {
        console.error('Failed to add to wishlist:', error);
        res.status(500).json({ success: false, message: 'Failed to add item to wishlist.' });
    }
});
// Remove from wishlist
r.delete('/:productId', async (req, res) => {
    try {
        await prisma_1.prisma.user.update({
            where: { id: req.user.userId },
            data: { wishlist: { disconnect: { id: req.params.productId } } },
        });
        res.json({ success: true, message: 'Removed from wishlist' });
    }
    catch (error) {
        console.error('Failed to remove from wishlist:', error);
        res.status(500).json({ success: false, message: 'Failed to remove item from wishlist.' });
    }
});
exports.default = r;
//# sourceMappingURL=wishlist.routes.js.map