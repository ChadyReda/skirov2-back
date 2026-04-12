import { Response } from 'express';
import { AuthRequest } from '../types';
export declare function getProfile(req: AuthRequest, res: Response): Promise<void>;
export declare function updateProfile(req: AuthRequest, res: Response): Promise<void>;
export declare function changePassword(req: AuthRequest, res: Response): Promise<void>;
export declare function addAddress(req: AuthRequest, res: Response): Promise<void>;
export declare function removeAddress(req: AuthRequest, res: Response): Promise<void>;
