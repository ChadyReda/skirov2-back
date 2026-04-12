"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePage = parsePage;
exports.paginate = paginate;
function parsePage(query) {
    const page = Math.max(1, parseInt(query.page || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(query.limit || '20', 10)));
    return { page, limit, skip: (page - 1) * limit };
}
function paginate(data, total, page, limit) {
    const totalPages = Math.ceil(total / limit);
    return {
        data,
        pagination: {
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        },
    };
}
//# sourceMappingURL=pagination.js.map