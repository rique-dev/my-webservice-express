import * as Joi from 'joi';
const Boom = require('boom');
const Extend = require('extend');
import { Request, Response, NextFunction } from 'express';

export default function Validate(schema: any) {
    const options = schema.options || {};
    return (req: Request, res: Response, next: NextFunction) => {
        const toValidate: any = {};
        if (!schema) {
            return next();
        }

        schema['params'] ? toValidate['params'] = req.params : false;
        schema['body'] ? toValidate['body'] = req.body : false;
        schema['query'] ? toValidate['query'] = req.query : false;

        function onValidationComplete(err: any, validated: any) {
            if (err) {
                return next(Boom.badRequest(err.message, err.details));
            }
            Extend(req, validated);
            return next();
        }

        return Joi.validate(toValidate, schema, options, onValidationComplete);
    };
}