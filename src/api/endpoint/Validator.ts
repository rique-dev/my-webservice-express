import * as Joi from 'joi';
// const JoiObjectId = require('joi-objectid');
import JoiObjectId from '../../util/joi-object-id';
// const objectId = JoiObjectId(Joi);

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
