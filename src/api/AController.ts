import { Request, Response } from 'express';
import { IController } from './IController';
import { IModel } from './IModel';
import { Model } from 'mongoose';


export abstract class AController implements IController {
    constructor(private entity: Model<IModel>) {
    }
    public list(req: Request, res: Response) {
        return res.json('list');
    }
    public create(req: Request, res: Response) {
        return res.json('create');
    }
    public read(req: Request, res: Response) {
        return res.json('read');
    }
    public update(req: Request, res: Response) {
        return res.json('update');
    }
    public destroy(req: Request, res: Response) {
        return res.json('destroy');
    }
}