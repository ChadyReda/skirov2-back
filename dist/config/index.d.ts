export declare const config: {
    env: string;
    port: number;
    databaseUrl: string;
    jwt: {
        accessSecret: string;
        refreshSecret: string;
        accessExpires: string;
        refreshExpires: string;
    };
    clientOrigin: string;
    uploadDir: string;
    maxFileSizeMb: number;
    supabaseUrl: string;
    supabaseAnonKey: string;
    supabaseServiceRoleKey: string;
    isDev: boolean;
    isProd: boolean;
};
