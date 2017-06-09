import { Request, Response } from 'express';
import { Document } from 'mongoose';

export interface IModel extends Document { }

export interface IController {
    list(req: Request, res: Response): void;
    create(req: Request, res: Response): void;
    read(req: Request, res: Response): void;
    update(req: Request, res: Response): void;
    destroy(req: Request, res: Response): void;
}