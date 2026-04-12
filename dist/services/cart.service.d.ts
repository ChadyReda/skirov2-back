export declare function getCart(userId: string): Promise<{
    items: ({
        product: {
            category: {
                id: string;
                name: string;
                slug: string;
            };
            images: {
                id: string;
                sortOrder: number;
                productId: string;
                url: string;
                alt: string;
                isPrimary: boolean;
            }[];
            variants: {
                id: string;
                sku: string;
                size: string | null;
                color: string | null;
                colorHex: string | null;
                stock: number;
                additionalPrice: import("@prisma/client/runtime/library").Decimal;
                productId: string;
            }[];
        } & {
            isActive: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
            sku: string;
            description: string;
            shortDescription: string;
            brand: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            compareAtPrice: import("@prisma/client/runtime/library").Decimal | null;
            tags: string[];
            isFeatured: boolean;
            isNewArrival: boolean;
            averageRating: number;
            reviewCount: number;
            totalSold: number;
            categoryId: string;
        };
        variant: {
            id: string;
            sku: string;
            size: string | null;
            color: string | null;
            colorHex: string | null;
            stock: number;
            additionalPrice: import("@prisma/client/runtime/library").Decimal;
            productId: string;
        };
    } & {
        id: string;
        productId: string;
        variantSku: string;
        quantity: number;
        cartId: string;
        variantId: string;
    })[];
} & {
    id: string;
    updatedAt: Date;
    userId: string;
}>;
export declare function addItem(userId: string, productId: string, variantSku: string, quantity: number): Promise<({
    items: ({
        product: {
            category: {
                id: string;
                name: string;
                slug: string;
            };
            images: {
                id: string;
                sortOrder: number;
                productId: string;
                url: string;
                alt: string;
                isPrimary: boolean;
            }[];
            variants: {
                id: string;
                sku: string;
                size: string | null;
                color: string | null;
                colorHex: string | null;
                stock: number;
                additionalPrice: import("@prisma/client/runtime/library").Decimal;
                productId: string;
            }[];
        } & {
            isActive: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
            sku: string;
            description: string;
            shortDescription: string;
            brand: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            compareAtPrice: import("@prisma/client/runtime/library").Decimal | null;
            tags: string[];
            isFeatured: boolean;
            isNewArrival: boolean;
            averageRating: number;
            reviewCount: number;
            totalSold: number;
            categoryId: string;
        };
        variant: {
            id: string;
            sku: string;
            size: string | null;
            color: string | null;
            colorHex: string | null;
            stock: number;
            additionalPrice: import("@prisma/client/runtime/library").Decimal;
            productId: string;
        };
    } & {
        id: string;
        productId: string;
        variantSku: string;
        quantity: number;
        cartId: string;
        variantId: string;
    })[];
} & {
    id: string;
    updatedAt: Date;
    userId: string;
}) | null>;
export declare function updateItem(userId: string, variantSku: string, quantity: number): Promise<({
    items: ({
        product: {
            category: {
                id: string;
                name: string;
                slug: string;
            };
            images: {
                id: string;
                sortOrder: number;
                productId: string;
                url: string;
                alt: string;
                isPrimary: boolean;
            }[];
            variants: {
                id: string;
                sku: string;
                size: string | null;
                color: string | null;
                colorHex: string | null;
                stock: number;
                additionalPrice: import("@prisma/client/runtime/library").Decimal;
                productId: string;
            }[];
        } & {
            isActive: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
            sku: string;
            description: string;
            shortDescription: string;
            brand: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            compareAtPrice: import("@prisma/client/runtime/library").Decimal | null;
            tags: string[];
            isFeatured: boolean;
            isNewArrival: boolean;
            averageRating: number;
            reviewCount: number;
            totalSold: number;
            categoryId: string;
        };
        variant: {
            id: string;
            sku: string;
            size: string | null;
            color: string | null;
            colorHex: string | null;
            stock: number;
            additionalPrice: import("@prisma/client/runtime/library").Decimal;
            productId: string;
        };
    } & {
        id: string;
        productId: string;
        variantSku: string;
        quantity: number;
        cartId: string;
        variantId: string;
    })[];
} & {
    id: string;
    updatedAt: Date;
    userId: string;
}) | null>;
export declare function removeItem(userId: string, variantSku: string): Promise<({
    items: ({
        product: {
            category: {
                id: string;
                name: string;
                slug: string;
            };
            images: {
                id: string;
                sortOrder: number;
                productId: string;
                url: string;
                alt: string;
                isPrimary: boolean;
            }[];
            variants: {
                id: string;
                sku: string;
                size: string | null;
                color: string | null;
                colorHex: string | null;
                stock: number;
                additionalPrice: import("@prisma/client/runtime/library").Decimal;
                productId: string;
            }[];
        } & {
            isActive: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
            sku: string;
            description: string;
            shortDescription: string;
            brand: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            compareAtPrice: import("@prisma/client/runtime/library").Decimal | null;
            tags: string[];
            isFeatured: boolean;
            isNewArrival: boolean;
            averageRating: number;
            reviewCount: number;
            totalSold: number;
            categoryId: string;
        };
        variant: {
            id: string;
            sku: string;
            size: string | null;
            color: string | null;
            colorHex: string | null;
            stock: number;
            additionalPrice: import("@prisma/client/runtime/library").Decimal;
            productId: string;
        };
    } & {
        id: string;
        productId: string;
        variantSku: string;
        quantity: number;
        cartId: string;
        variantId: string;
    })[];
} & {
    id: string;
    updatedAt: Date;
    userId: string;
}) | null>;
export declare function clearCart(userId: string): Promise<void>;
