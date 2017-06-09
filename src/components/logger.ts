const winston = require('winston'); // TODO: Fix
import CONFIG from '../configuration';
import * as path from 'path';
import * as Moment from 'moment';

export = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            formatter(options: any): string {
                /* tslint:disable-next-line max-line-length */
                return `${options.timestamp()} ${options.level} [${CONFIG.NODE_ENV || 'UNKNOW ENV'}] ${(options.message ? options.message : '')} ${options.meta && Object.keys(options.meta).length ? `\n\t${JSON.stringify(options.meta)}` : ''}`;
            },
            timestamp(): string {
                return Moment().format();
            }
        }),
        new (winston.transports.File)({
            filename: CONFIG.LOG_FILE_INFO
        })
    ],
    exceptionHandlers: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({
            filename: CONFIG.LOG_FILE_PANIC
        })]
});
