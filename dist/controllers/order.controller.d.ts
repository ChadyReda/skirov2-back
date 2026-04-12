import { Response } from 'express';
import { AuthRequest } from '../types';
export declare function create(req: AuthRequest, res: Response): Promise<void>;
export declare function myOrders(req: AuthRequest, res: Response): Promise<void>;
export declare function getOne(req: AuthRequest, res: Response): Promise<void>;
export declare function adminList(req: AuthRequest, res: Response): Promise<void>;
export declare function updateStatus(req: AuthRequest, res: Response): Promise<void>;
