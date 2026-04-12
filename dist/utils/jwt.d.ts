import { JwtPayload } from '../types';
export declare function signAccessToken(payload: JwtPayload): string;
export declare function signRefreshToken(payload: JwtPayload): string;
export declare function verifyAccessToken(token: string): JwtPayload;
export declare function verifyRefreshToken(token: string): JwtPayload;
export declare function makeTokenPair(payload: JwtPayload): {
    accessToken: string;
    refreshToken: string;
};
