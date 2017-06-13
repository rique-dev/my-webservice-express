import * as Boom from 'boom';
import { Response } from 'express';

const HttpResponse = (res: Response, payload: Boom.Output) => {
    return res.status(payload.statusCode).json(payload);
};

export const HttpInternalServerError = (res: Response, err?: string) => {
    if (!err) {
        err = 'An internal server error occurred';
    }
    const payload: Boom.Output = Boom.internal(err).output;
    return HttpResponse(res, payload);
};

export const HttpNotFound = (res: Response, modelString?: string) => {
    if (!modelString) {
        modelString = 'Item not found';
    }
    const payload = Boom.notFound(modelString).output;
    return HttpResponse(res, payload);
};

export const HttpBadRequest = (res: Response, itemExistString?: string, data?: any) => {
    if (!itemExistString) {
        itemExistString = 'Item exist';
    }
    const payload = Boom.badRequest(itemExistString, data).output;
    return HttpResponse(res, payload);
};

