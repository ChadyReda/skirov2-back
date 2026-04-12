import { Response, NextFunction } from 'express';
import { AuthRequest, UserRole } from '../types';
export declare function authenticate(req: AuthRequest, _res: Response, next: NextFunction): void;
export declare function optionalAuth(req: AuthRequest, _res: Response, next: NextFunction): void;
export declare function requireRole(...roles: UserRole[]): (req: AuthRequest, _res: Response, next: NextFunction) => void;
export declare const requireAdmin: (req: AuthRequest, _res: Response, next: NextFunction) => void;
