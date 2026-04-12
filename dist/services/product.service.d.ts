import { ProductQuery } from '../types';
export declare function listProducts(query: ProductQuery): Promise<import("../utils/pagination").PaginatedResult<{
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
}>>;
export declare function getProductBySlug(slug: string): Promise<{
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
}>;
export declare function getProductById(id: string): Promise<{
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
}>;
export declare function getFeaturedProducts(limit?: number): Promise<({
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
})[]>;
export declare function getNewArrivals(limit?: number): Promise<({
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
})[]>;
export declare function getRelatedProducts(productId: string, categoryId: string, limit?: number): Promise<({
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
})[]>;
export declare function createProduct(data: any): Promise<{
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
}>;
export declare function updateProduct(id: string, data: any): Promise<{
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
}>;
export declare function softDeleteProduct(id: string): Promise<{
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
}>;
