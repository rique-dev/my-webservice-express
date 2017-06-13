import { Request, Response } from 'express';
import Controller from '../../components/endpoint/Controller';
import { Thing, ThingDocument } from './base/thing';
import { show } from './thing.provider';
import ThingDao from './thing.dao';
import { Document } from 'mongoose';
import * as Boom from 'boom';
export default class ThingController extends Controller {
    // public async list(req: Request, res: Response) {
    //     let things: ThingDocument[];
    //     try {
    //         things = await ThingDao.list();
    //         if (!things) {
    //             res.json(Boom.notFound('Thing not found').output);
    //         }
    //     } catch (error) {
    //         res.status(500).json(Boom.internal(error).output);
    //     }
    //     return res.json(things);
    // }
}

export const {
    create,
    read,
    update,
    destroy,
    list,
} = new ThingController();
