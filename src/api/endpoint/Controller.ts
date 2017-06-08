import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { AController } from '../AController';
import { IEntityModel } from './IEntity';
import { IModel } from '../IModel';
import { Entity } from './Model';
import Provider from './Provider';


class Controller extends AController {
    constructor(Model: Model<IEntityModel>) {
        super(Model);
    }
    public list(req: Request, res: Response) {
        Provider.show();
        // Execute antes
        return super.list(req, res);
    }
    public read(req: Request, res: Response) {
        Provider.show();
        // Execute antes
        return super.read(req, res);
    }
}

export const {
    create,
    read,
    update,
    destroy,
    list,
} = new Controller(Entity);
