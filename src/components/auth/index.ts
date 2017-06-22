import { Router } from 'express';
import { Local } from './local';

class Auth {
    static get router() {
        const router: Router = Router();
        router.use('/local', Local.router);
        // router.use('/facebook', require('./facebook').default);
        // router.use('/twitter', require('./twitter').default);
        // router.use('/google', require('./google').default);
        return router;
    }
}


