import { Request, Response } from 'express';
import { Model } from 'mongoose';

import { IController, IModel } from './interfaces';

export default abstract class Controller implements IController {
    constructor(private entity: Model<IModel>) {
    }
    public list(req: Request, res: Response) {
        res.json('list');
    }
    public create(req: Request, res: Response) {
        res.json('create');
    }
    public read(req: Request, res: Response) {
        res.json('read');
    }
    public update(req: Request, res: Response) {
        res.json('update');
    }
    public destroy(req: Request, res: Response) {
        res.json('destroy');
    }
}