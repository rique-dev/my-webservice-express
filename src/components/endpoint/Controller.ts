import { Request, Response } from 'express';
import { Document, Model } from 'mongoose';
import DocumentDao from './Dao';
import { HttpInternalServerError, HttpNotFound, HttpBadRequest } from '../handles';
import { Entity } from './endpoint';

let Dao: DocumentDao;
export default class Controller {
    constructor(public documentDao: DocumentDao) {
        Dao = documentDao;
    }

    public async list(req: Request, res: Response): Promise<Response> {
        let documents: Document[];
        try {
            documents = await Dao.list();
            if (!documents) {
                return HttpNotFound(res);
            }
        } catch (err) {
            console.log('ERR', err);
            return HttpInternalServerError(res, err);
        }

        return res.json(documents);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const data: Entity = req.body;
        let document: Document;

        try {
            document = await Dao.create(data);
            if (!document) {
                return HttpBadRequest(res);
            }
        } catch (err) {
            return HttpInternalServerError(res, err);
        }

        return res.status(201).json(document);
    }

    public async read(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        let document: Document;

        try {
            document = await Dao.read(id);
            if (!document) {
                return HttpNotFound(res);
            }
        } catch (err) {
            return HttpInternalServerError(res, err);
        }

        return res.json(document);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const data: Entity = req.body;
        let document: Document;

        try {
            document = await Dao.update(id, data);
            if (!document) {
                return HttpNotFound(res);
            }
        } catch (err) {
            return HttpInternalServerError(res, err);
        }

        return res.json(document);
    }

    public async destroy(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        let document: Document;

        try {
            document = await Dao.destroy(id);
            if (!document) {
                return HttpNotFound(res);
            }
        } catch (err) {
            return HttpInternalServerError(res, err);
        }

        return res.json(document);
    }
}
