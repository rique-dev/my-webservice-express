import { Request, Response } from 'express';

export interface IController {
    list(req: Request, res: Response): Promise<Response>;
    create(req: Request, res: Response): Promise<Response>;
    read(req: Request, res: Response): Promise<Response>;
    update(req: Request, res: Response): Promise<Response>;
    destroy(req: Request, res: Response): Promise<Response>;
}
