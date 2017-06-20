import CONFIG from './index';
export const RequestTimeout = '5s';

export class Constants {
    static TESTE: string = 'Test';
}
export const ENV = {
    DEVELOPMENT: 'DEVELOPMENT',
    TEST: 'TEST',
    PRODUCTION: 'PRODUCTION',
};

export enum PORT {
    DEVELOPMENT = 3000,
    PRODUCTION = 80,
    TEST = 9000
}
