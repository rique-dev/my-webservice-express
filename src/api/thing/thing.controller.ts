import { Request, Response } from 'express';
import Controller from '../../components/endpoint/Controller';
import { Thing, ThingDocument } from './base/thing';
import { show } from './thing.provider';
import ThingDao from './base/thing.dao';
import { Document } from 'mongoose';
import * as Boom from 'boom';
import { HttpInternalServerError, HttpNotFound, HttpBadRequest } from './../../components/handles';

export default class ThingController extends Controller {

    public async list(req: Request, res: Response) {
        let things: ThingDocument[];
        try {
            things = await ThingDao.list();
            if (!things) {
                return HttpNotFound(res);
            }
        } catch (err) {
            return HttpInternalServerError(res, err);
        }
        return res.json(things);
    }

    public async create(req: Request, res: Response) {
        let thing: Thing = req.body;
        try {
            thing = await ThingDao.create(thing);
            if (!thing) {
                return HttpBadRequest(res);
            }
        } catch (err) {
            return HttpInternalServerError(res, err);
        }
        return res.status(201).json(thing);
    }

    public async read(req: Request, res: Response) {
        const id = req.params.id;
        let thing: ThingDocument;
        try {
            thing = await ThingDao.read(id);
            if (!thing) {
                return HttpNotFound(res);
            }
        } catch (err) {
            return HttpInternalServerError(res, err);
        }
        return res.json(thing);
    }

    public async update(req: Request, res: Response) {
        const id = req.params.id;
        const thingUpdate: Thing = req.body;
        let thing: ThingDocument;
        try {
            thing = await ThingDao.update(id, thingUpdate);
            if (!thing) {
                return HttpNotFound(res);
            }
        } catch (err) {
            return HttpInternalServerError(res, err);
        }
        return res.json(thing);
    }

    public async destroy(req: Request, res: Response) {
        const id = req.params.id;
        let thing: ThingDocument;
        try {
            thing = await ThingDao.destroy(id);
            if (!thing) {
                return HttpNotFound(res);
            }
        } catch (err) {
            return HttpInternalServerError(res, err);
        }
        return res.json(thing);
    }
}

export const {
    create,
    read,
    update,
    destroy,
    list,
} = new ThingController();
