import CONFIG from './../configuration';
import Entity from './endpoint/Router';
import * as Express from 'express';

class API {
    static get routes() {
        const app = Express();

        app.use(`${CONFIG.API_VERSION}/endpoint`, Entity.routers);

        return app;
    }
}

export default API;
