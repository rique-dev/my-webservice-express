import * as path from 'path';
import * as CONST from './constant';

export class Configuration {
    public ROOT: string = path.normalize(`${__dirname}/..`);
    public IP = process.env.IP || 'localhost';
    public SECRET: string = process.env.SECRET || 'my-secret-pharse';
    public NAME_WEBSERVICE = process.env.NAME_WEBSERVICE || 'my-web-service';
    public MONGO_URL: string = process.env.MONGO_URL || `mongodb://localhost/${this.NAME_WEBSERVICE}-${this.NODE_ENV}`;
    public API_VERSION: string = `/api/${process.env.API_VERSION || 'v1'}`;
    public LOG_FILE_INFO: string = path.resolve(__dirname, '../log/info.log.js');
    public LOG_FILE_PANIC: string = path.resolve(__dirname, '../log/panic.log.js');
    public console() {
        console.log(`Web Service started: ${this.PORT}`);
    }

    public get NODE_ENV(): string {
        return process.env.NODE_ENV || CONST.ENV.DEVELOPMENT;
    }

    public get USER_ROLES(): Array<string> {
        return ['user', 'admin'];
    }

    public get ROLE_USER(): string {
        return this.USER_ROLES[0];
    }
    public get ROLE_ADMIN(): string {
        return this.USER_ROLES[1];
    }

    public get PORT(): number {
        if (this.NODE_ENV === CONST.ENV.TEST) {
            return CONST.PORT.TEST;
        } else if (this.NODE_ENV === CONST.ENV.PRODUCTION) {
            return process.env.PORT || CONST.PORT.PRODUCTION;
        }
        return CONST.PORT.DEVELOPMENT;
    }
}

export default new Configuration();
