import * as path from 'path';
import { ENV, PORT } from './constant';

class Configuration {
    public NODE_ENV: ENV;
    public PORT: PORT;
    public ROOT: string = path.normalize(`${__dirname}/..`);
    public IP = process.env.IP || 'localhost';
    public SECRET: string = process.env.SECRET || 'my-secret-pharse';
    public NAME_WEBSERVICE = process.env.NAME_WEBSERVICE || 'my-web-service';
    public MONGO_URL: string = process.env.MONGO_URL || `mongodb://localhost/${this.NAME_WEBSERVICE}-${this.NODE_ENV}`;
    public API_VERSION: string = `/api/${process.env.API_VERSION || 'v1'}`;
    public LOG_FILE_INFO: string = path.resolve(__dirname, '../log/info.log.js');
    public LOG_FILE_PANIC: string = path.resolve(__dirname, '../log/panic.log.js');

    constructor() {
        this.environment();
        this.port();
    }

    public console() {
        console.log(`Web Service started: ${this.PORT}`);
    }

    private environment() {
        this.NODE_ENV = process.env.NODE_ENV || ENV.DEVELOPMENT;
    }

    private port() {
        if (this.NODE_ENV === ENV.TEST) {
            this.PORT = PORT.TEST;
        } else if (this.NODE_ENV === ENV.PRODUCTION) {
            this.PORT = process.env.PORT || PORT.PRODUCTION;
        }
        this.PORT = PORT.DEVELOPMENT;
    }
}

export default new Configuration();