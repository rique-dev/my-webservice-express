import { Request, Response } from 'express';
import { Model } from 'mongoose';
import C from '../../components/endpoint/Controller';
import { IEntityDocument } from './base/Interfaces';
import { Entity } from './Entity';
import { show } from './Provider';

class Controller extends C {
    constructor(entity: Model<IEntityDocument>) {
        super(entity);
    }

    public list(req: Request, res: Response) {
        show();
        // Execute antes
        return super.list(req, res);
    }

    public read(req: Request, res: Response) {
        show();
        // Execute antes
        return super.read(req, res);
    }

    public custom(req: Request, res: Response) {
        Entity.find({}).exec()
            .then(entity => {
                res.json(entity);
            });
    }
}

export const {
    create,
    read,
    update,
    destroy,
    list,
} = new Controller(Entity);
