import endpoint from './endpoint/Router';
import CONFIG from './../configuration';
import * as Express from 'express';

export class API {
    static get routes() {
        const app = Express();
        app.use(`${CONFIG.API_VERSION}/endpoint`, endpoint);

        return app;
    }
}
export default function (app: Express.Application) {
    app.use(`${CONFIG.API_VERSION}/endpoint`, endpoint);
}