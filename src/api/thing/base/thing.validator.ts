import * as Joi from 'joi';
import JoiObjectId from '../../../util/joi-object-id';
import Validate from '../../../components/validate';

export default class Validator {

    static get create(): Object {
        return {
            body: Joi.object().keys({
                name: Joi.string().required()
            })
        };
    }

    static get params(): Object {
        return {
            params: Joi.object().keys({
                id: JoiObjectId().required()
            })
        };
    }

    static get update(): Object {
        return Object.assign(Validator.create, Validator.params);
    }
}
