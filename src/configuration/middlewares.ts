import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as errorHandler from 'errorhandler';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as methodOverride from 'method-override';
import * as Express from 'express';
const lusca = require('lusca'); // No Types
const requestTimeout = require('connect-timeout'); // No Types
import * as cors from 'cors';
import CONFIG from './index';
import { ENV, RequestTimeout } from './constant';
import API from './../api';
import { APIDocsRouter } from './swagger';

export class Middleware {

    static get configuration() {
        const app = Express();
        app.use(requestTimeout(RequestTimeout));
        app.use(Express.static(path.join(CONFIG.ROOT, 'public')));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(compression());
        app.use(helmet());
        app.use(morgan('dev'));
        app.use(methodOverride());
        app.use(lusca.xframe('SAMEORIGIN'));
        app.use(lusca.xssProtection(true));
        app.use(cors());
        app.use((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
            next();
        });

        // view engine setup
        app.set('views', path.join(CONFIG.ROOT, 'views'));
        app.set('view engine', 'index');

        app.use(API);

        // Documentation
        app.use(`${CONFIG.API_VERSION}/docs`, new APIDocsRouter().getRouter());

        app.use((err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
            err.status = 404;
            next(err);
        });

        app.use((err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
            if (err.isBoom) {
                return res.status(err.output.statusCode).json(err.output.payload);
            }
        });

        if (CONFIG.NODE_ENV === ENV.DEVELOPMENT || CONFIG.NODE_ENV === ENV.TEST) {
            app.use(errorHandler());
        }

        app.get(CONFIG.API_VERSION, (req: Express.Request, res: Express.Response) => {
            res.sendFile(`${CONFIG.ROOT}/public/index.html`);
        });

        // All undefined asset or api routes should return a 404
        app.route('/:url(api|auth|components|app|bower_components|assets)/*')
            .get((req: Express.Request, res: Express.Response) => {
                res.sendFile(`${CONFIG.ROOT}/public/404.html`);
            });

        // All other routes should redirect to the index.html
        app.route('/*')
            .get((req: Express.Request, res: Express.Response) => {
                res.sendFile(`${CONFIG.ROOT}/public/404.html`);
            });

        return app;
    }
}
