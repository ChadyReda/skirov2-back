export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}
export interface PaginatedResult<T> {
    data: T[];
    pagination: PaginationMeta;
}
export declare function parsePage(query: {
    page?: string;
    limit?: string;
}): {
    page: number;
    limit: number;
    skip: number;
};
export declare function paginate<T>(data: T[], total: number, page: number, limit: number): PaginatedResult<T>;
