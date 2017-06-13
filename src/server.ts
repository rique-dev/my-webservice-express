import * as Express from 'express';
import CONFIG from './configuration';
import { Middleware } from './configuration/middlewares';
import MongoConnector from './components/mongoose';
import API from './api';

// Creates and configures an ExpressJS web server.
class Server {
    // ref to Express instance
    public app: Express.Application;

    // Run configuration methods on the Express instance.
    constructor() {
        this.app = Express();
        this.MongoDB();
        this.Middleware();
        this.Init();
    }

    // Configure API endpoints.
    private Middleware() {
        this.app.use(Middleware.configuration);
    }

    private MongoDB() {
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

    private Init() {
        this.app
            .listen(CONFIG.PORT, () => {
                CONFIG.console();
            });
    }
}

export default new Server().app;
