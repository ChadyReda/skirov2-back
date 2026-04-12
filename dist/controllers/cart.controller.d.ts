import { Response } from 'express';
import { AuthRequest } from '../types';
export declare function getCart(req: AuthRequest, res: Response): Promise<void>;
export declare function addItem(req: AuthRequest, res: Response): Promise<void>;
export declare function updateItem(req: AuthRequest, res: Response): Promise<void>;
export declare function removeItem(req: AuthRequest, res: Response): Promise<void>;
export declare function clearCart(req: AuthRequest, res: Response): Promise<void>;
