import { Response } from 'express';
import { AuthRequest } from '../types';
export declare function getDashboardStats(_req: AuthRequest, res: Response): Promise<void>;
export declare function listUsers(req: AuthRequest, res: Response): Promise<void>;
export declare function updateUserRole(req: AuthRequest, res: Response): Promise<void>;
export declare function updateUserStatus(req: AuthRequest, res: Response): Promise<void>;
