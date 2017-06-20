import * as assert from 'assert';
import * as Joi from 'joi';

export default function joiObjectId() {
    const message = 'invalid mongodb objectId';
    return Joi.string().regex(/^[0-9a-fA-F]{24}$/, message);
}
