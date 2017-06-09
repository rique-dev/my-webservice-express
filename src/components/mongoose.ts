import * as mongodb from 'mongodb';

export default class MongoConnector {

    private database: mongodb.Db;

    constructor() {

    }

    public connect(url: string, options: string[]): Promise<string> {
        if (this.database === undefined) {
            console.log('database undefined, connecting...');
        }
        return new Promise((resolve, reject) => {
            mongodb.MongoClient.connect(url, options).then(
                (response) => {
                    this.database = response;
                    resolve(response);
                    if (this.database != undefined) {
                        console.log('database connection created!');
                    }
                    this.database.on('close', () => {
                        console.log('mongo closed!');
                        process.exit(1);
                    });
                },
                (error) => {
                    reject(error);
                }
            ).catch((ex) => {
                reject(ex);
            });
        });
    }

    private callMethod(fn: Promise<string>): Promise<string> {
        return new Promise(
            (resolve, reject) => {
                fn.then(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        reject(error);
                    }
                ).catch((error) => {
                    console.log(error);
                });
            }
        );
    }

    public getListOfDatabases(): Promise<string> {
        return this.callMethod(this.database.admin().listDatabases());
    }

    public ping(): Promise<string> {
        return this.callMethod(this.database.admin().ping());
    }
}