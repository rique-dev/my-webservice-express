import * as Joi from 'joi';
import JoiObjectId from '../../../util/joi-object-id';

export const create = {
    body: Joi.object().keys({
        name: Joi.string().required()
    })
};

export const params = {
    params: Joi.object().keys({
        id: JoiObjectId().required()
    })
};

export const update = {
    body: Joi.object().keys({
        id: JoiObjectId(),
        name: Joi.string(),
        createAt: Joi.date()
    }),
    params,
};
