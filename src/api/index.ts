import CONFIG from './../configuration';
import ThingRouter from './thing/thing.routers';
import * as express from 'express';

export class API {
    static get routes(): Express.Application {
        const app = express();

        app.use(`${CONFIG.API_VERSION}/thing`, ThingRouter);

        return app;
    }
}

export default API.routes;
