import { Router } from 'express';
import {
    create,
    read,
    update,
    destroy,
    list
} from './Controller';
import Validate from '../../components/validate';
import * as Validator from './base/Validator';

export default class EntityRouter {
    static get routers() {
        const router: Router = Router();
        router.get('/', list);
        router.get('/:id', Validate(Validator.params), read);
        router.post('/', Validate(Validator.create), create);
        router.put('/:id', Validate(Validator.update), update);
        router.delete('/:id', Validate(Validator.params), destroy);
        return router;
    }
}