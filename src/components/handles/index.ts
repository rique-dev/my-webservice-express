import * as Boom from 'boom';
import { Response } from 'express';

const HttpResponse = (res: Response, payload: Boom.Output): Response => {
    return res.status(payload.statusCode).json(payload);
};

export const HttpInternalServerError = (res: Response, err?: string): Response => {
    if (!err) {
        err = 'An internal server error occurred';
    }
    const payload: Boom.Output = Boom.internal(err).output;
    return HttpResponse(res, payload);
};

export const HttpNotFound = (res: Response, message?: string): Response => {
    if (!message) {
        message = 'Item not found';
    }
    const payload = Boom.notFound(message).output;
    return HttpResponse(res, payload);
};

export const HttpBadRequest = (res: Response, message?: string, data?: any): Response => {
    if (!message) {
        message = 'Item not exist';
    }
    const payload = Boom.badRequest(message, data).output;
    return HttpResponse(res, payload);
};

export const HttpNotImplemented = (res: Response, message?: string, data?: any): Response => {
    if (!message) {
        message = '';
    }
    const payload = Boom.notImplemented(message, data).output;
    return HttpResponse(res, payload);
};


export const HttpUnauthorized = (res: Response, message?: string, data?: any): Response => {
    if (!message) {
        message = '';
    }
    const payload = Boom.unauthorized(message, data).output;
    return HttpResponse(res, payload);
};

export const HttpForbidden = (res: Response, message?: string, data?: any): Response => {
    if (!message) {
        message = '';
    }
    const payload = Boom.forbidden(message, data).output;
    return HttpResponse(res, payload);
};
