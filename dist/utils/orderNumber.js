"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOrderNumber = generateOrderNumber;
function generateOrderNumber() {
    const date = new Date();
    const y = date.getFullYear().toString().slice(-2);
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `EL${y}${m}${d}-${rand}`;
}
//# sourceMappingURL=orderNumber.js.map