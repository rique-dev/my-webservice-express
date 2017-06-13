import { Request, Response } from 'express';

import { IController } from './interfaces';

import { Document } from 'mongoose';

export default abstract class Controller {
    public async list(req: Request, res: Response) {
        return res.json('list');
    }
    public async create(req: Request, res: Response) {
        return res.json('create');
    }
    public async read(req: Request, res: Response) {
        return res.json('read');
    }
    public async update(req: Request, res: Response) {
        return res.json('update');
    }
    public async destroy(req: Request, res: Response) {
        return res.json('destroy');
    }
}
