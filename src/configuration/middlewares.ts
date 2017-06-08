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
import { API } from './../api';

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

        app.use(API.routes);

        app.use((err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
            err.status = 404;
            next(err);
        });

        if (CONFIG.NODE_ENV === ENV.DEVELOPMENT || CONFIG.NODE_ENV === ENV.TEST) {
            app.use(errorHandler());
        }
        return app;
    }
}

export const lowLevel = (app: Express.Application) => {
    // Example error handler
    app.use((err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
        if (err.isBoom) {
            return res.status(err.output.statusCode).json(err.output.payload);
        }
    });
};
export const topLevel = (app: Express.Application) => {
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

    app.use((err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
        err.status = 404;
        next(err);
    });

    if (CONFIG.NODE_ENV === ENV.DEVELOPMENT || CONFIG.NODE_ENV === ENV.TEST) {
        app.use(errorHandler());
    }
};