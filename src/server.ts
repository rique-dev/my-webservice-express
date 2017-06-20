import * as Express from 'express';
import CONFIG from './configuration';
import { Middleware } from './configuration/middlewares';
import DataAccess from './components/mongoose';
import API from './api';
import { mock } from './util/seed.mock';

// Creates and configures an ExpressJS web server.
class Server {
    // ref to Express instance
    public app: Express.Application;

    // Run configuration methods on the Express instance.
    constructor() {
        this.app = Express();
        this.Database();
        this.Middleware();
    }

    // Configure API endpoints.
    private Middleware() {
        this.app.use(Middleware.configuration);
    }

    private Database() {
        DataAccess.connect();
        mock();
        // const url: string = 'mongodb://localhost:27017/';
        // const options: string[];
        // const mongo = new MongoConnector;
        // const connection = mongo.connect(url, options)
        //     .then()
        //     .catch((error) => {
        //         console.log(error.name, error.message);
        //         process.exit(1);
        //     });

        // route.get('/api/admin/listdatabases', (req, res) => {
        //     mongo.getListOfDatabases().then((data) => {
        //         res.send(data);
        //     }, (error) => {
        //         console.log(error);
        //     });
        // });

        // route.get('/api/admin/ping', (req, res) => {
        //     mongo.ping().then((data) => {
        //         res.send(data);
        //     },
        //         (error) => {
        //             console.log(error);
        //         });
        // });
    }
}

export default new Server().app;
