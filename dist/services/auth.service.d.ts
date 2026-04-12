export declare function register(input: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}): Promise<{
    user: {
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        passwordHash: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        avatar: string | null;
    };
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
}>;
export declare function login(input: {
    email: string;
    password: string;
}): Promise<{
    user: {
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        passwordHash: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        avatar: string | null;
    };
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
}>;
export declare function refreshTokens(token: string): Promise<{
    accessToken: string;
    refreshToken: string;
}>;
export declare function getMe(userId: string): Promise<{
    addresses: {
        id: string;
        createdAt: Date;
        userId: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        street: string;
        apartment: string | null;
        city: string;
        state: string;
        zip: string;
        country: string;
        label: string;
        isDefault: boolean;
    }[];
} & {
    role: import(".prisma/client").$Enums.Role;
    isActive: boolean;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    avatar: string | null;
}>;
