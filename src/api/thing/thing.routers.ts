import { RouterOptions, Router } from 'express';
import thingControler from './thing.controller';
import Validate from '../../components/validate';
import Validator from './base/thing.validator';

export class ThingRouter {

    static get routers(): Router {
        const router: Router = Router();
        router.get('/', thingControler.list);
        router.get('/:id', Validate(Validator.params), thingControler.read);
        router.post('/', Validate(Validator.create), thingControler.create);
        router.put('/:id', Validate(Validator.update), thingControler.update);
        router.delete('/:id', Validate(Validator.params), thingControler.destroy);
        return router;
    }
}

export default ThingRouter.routers;
