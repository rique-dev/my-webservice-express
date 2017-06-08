import { Router } from 'express';
import {
    create,
    read,
    update,
    destroy,
    list
} from './Controller';
import Validate from '../../provider/validate';
import * as Validator from './Validator';

const router: Router = Router();

router
    .get('/', list)
    .get('/:id', Validate(Validator.params), read)
    .post('/', Validate(Validator.create), create)
    .put('/:id', Validate(Validator.update), update)
    .delete('/:id', Validate(Validator.params), destroy);

export default router;