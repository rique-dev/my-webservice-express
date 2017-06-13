import CONFIG from './../configuration';
import ThingRouter from './thing/thing.routers';
import * as express from 'express';

class API {
    static get routes() {
        const app = express();

        app.use(`${CONFIG.API_VERSION}/thing`, ThingRouter);

        return app;
    }
}

export default API.routes;
