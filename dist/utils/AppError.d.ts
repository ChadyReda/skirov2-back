export declare class AppError extends Error {
    readonly statusCode: number;
    readonly isOperational: boolean;
    constructor(message: string, statusCode?: number, isOperational?: boolean);
}
export declare const notFound: (r?: string) => AppError;
export declare const unauthorized: (msg?: string) => AppError;
export declare const forbidden: (msg?: string) => AppError;
export declare const conflict: (msg: string) => AppError;
export declare const badRequest: (msg: string) => AppError;
