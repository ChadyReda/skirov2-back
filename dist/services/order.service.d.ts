import { OrderStatus } from '../types';
export declare function createOrder(input: {
    userId?: string;
    guestEmail?: string;
    items: {
        productId: string;
        variantSku: string;
        quantity: number;
    }[];
    shippingAddress: {
        firstName: string;
        lastName: string;
        phone?: string;
        street: string;
        apartment?: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    paymentMethod?: string;
    couponCode?: string;
    notes?: string;
}): Promise<{
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    } | null;
    shippingAddress: {
        id: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        street: string;
        apartment: string | null;
        city: string;
        state: string;
        zip: string;
        country: string;
        orderId: string;
    } | null;
    items: {
        id: string;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        productId: string;
        variantSku: string;
        quantity: number;
        image: string;
        variantLabel: string;
        orderId: string;
    }[];
} & {
    paymentStatus: import(".prisma/client").$Enums.PayStatus;
    total: import("@prisma/client/runtime/library").Decimal;
    id: string;
    orderNumber: string;
    guestEmail: string | null;
    subtotal: import("@prisma/client/runtime/library").Decimal;
    shippingCost: import("@prisma/client/runtime/library").Decimal;
    tax: import("@prisma/client/runtime/library").Decimal;
    discount: import("@prisma/client/runtime/library").Decimal;
    status: import(".prisma/client").$Enums.OrderStatus;
    paymentMethod: string;
    paymentRef: string | null;
    couponCode: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
}>;
export declare function getUserOrders(userId: string, query: {
    page?: string;
    limit?: string;
}): Promise<import("../utils/pagination").PaginatedResult<{
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    } | null;
    shippingAddress: {
        id: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        street: string;
        apartment: string | null;
        city: string;
        state: string;
        zip: string;
        country: string;
        orderId: string;
    } | null;
    items: {
        id: string;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        productId: string;
        variantSku: string;
        quantity: number;
        image: string;
        variantLabel: string;
        orderId: string;
    }[];
} & {
    paymentStatus: import(".prisma/client").$Enums.PayStatus;
    total: import("@prisma/client/runtime/library").Decimal;
    id: string;
    orderNumber: string;
    guestEmail: string | null;
    subtotal: import("@prisma/client/runtime/library").Decimal;
    shippingCost: import("@prisma/client/runtime/library").Decimal;
    tax: import("@prisma/client/runtime/library").Decimal;
    discount: import("@prisma/client/runtime/library").Decimal;
    status: import(".prisma/client").$Enums.OrderStatus;
    paymentMethod: string;
    paymentRef: string | null;
    couponCode: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
}>>;
export declare function getOrderById(id: string, userId?: string): Promise<{
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    } | null;
    shippingAddress: {
        id: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        street: string;
        apartment: string | null;
        city: string;
        state: string;
        zip: string;
        country: string;
        orderId: string;
    } | null;
    items: {
        id: string;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        productId: string;
        variantSku: string;
        quantity: number;
        image: string;
        variantLabel: string;
        orderId: string;
    }[];
} & {
    paymentStatus: import(".prisma/client").$Enums.PayStatus;
    total: import("@prisma/client/runtime/library").Decimal;
    id: string;
    orderNumber: string;
    guestEmail: string | null;
    subtotal: import("@prisma/client/runtime/library").Decimal;
    shippingCost: import("@prisma/client/runtime/library").Decimal;
    tax: import("@prisma/client/runtime/library").Decimal;
    discount: import("@prisma/client/runtime/library").Decimal;
    status: import(".prisma/client").$Enums.OrderStatus;
    paymentMethod: string;
    paymentRef: string | null;
    couponCode: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
}>;
export declare function adminListOrders(query: {
    page?: string;
    limit?: string;
    status?: string;
    search?: string;
}): Promise<import("../utils/pagination").PaginatedResult<{
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    } | null;
    shippingAddress: {
        id: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        street: string;
        apartment: string | null;
        city: string;
        state: string;
        zip: string;
        country: string;
        orderId: string;
    } | null;
    items: {
        id: string;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        productId: string;
        variantSku: string;
        quantity: number;
        image: string;
        variantLabel: string;
        orderId: string;
    }[];
} & {
    paymentStatus: import(".prisma/client").$Enums.PayStatus;
    total: import("@prisma/client/runtime/library").Decimal;
    id: string;
    orderNumber: string;
    guestEmail: string | null;
    subtotal: import("@prisma/client/runtime/library").Decimal;
    shippingCost: import("@prisma/client/runtime/library").Decimal;
    tax: import("@prisma/client/runtime/library").Decimal;
    discount: import("@prisma/client/runtime/library").Decimal;
    status: import(".prisma/client").$Enums.OrderStatus;
    paymentMethod: string;
    paymentRef: string | null;
    couponCode: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
}>>;
export declare function updateOrderStatus(id: string, status: OrderStatus): Promise<{
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    } | null;
    shippingAddress: {
        id: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        street: string;
        apartment: string | null;
        city: string;
        state: string;
        zip: string;
        country: string;
        orderId: string;
    } | null;
    items: {
        id: string;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        productId: string;
        variantSku: string;
        quantity: number;
        image: string;
        variantLabel: string;
        orderId: string;
    }[];
} & {
    paymentStatus: import(".prisma/client").$Enums.PayStatus;
    total: import("@prisma/client/runtime/library").Decimal;
    id: string;
    orderNumber: string;
    guestEmail: string | null;
    subtotal: import("@prisma/client/runtime/library").Decimal;
    shippingCost: import("@prisma/client/runtime/library").Decimal;
    tax: import("@prisma/client/runtime/library").Decimal;
    discount: import("@prisma/client/runtime/library").Decimal;
    status: import(".prisma/client").$Enums.OrderStatus;
    paymentMethod: string;
    paymentRef: string | null;
    couponCode: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
}>;
