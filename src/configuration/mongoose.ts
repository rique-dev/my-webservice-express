import * as Mongoose from 'mongoose';
import CONFIG from './index';

enum ConnectionState {
    ALIVE,
    DEAD
}

interface DB {
    connect(): any;
    status(): ConnectionState;
}

class Mongo implements DB {

    constructor(private connectionString: string) {
    }

    connect(): any {
    Mongoose.connect(this.connectionString, err => {
        if (err) {
                console.log('Could not connect to Mongo!!');
                console.log(err.name);
                console.log(err.message);
            }
        });
    }

    status(): ConnectionState {
        const connections = Mongoose.connections;
        if (!connections) {
            return ConnectionState.DEAD;
        } else {
            for (let i = 0; i < connections.length; i++) {
                const connection = connections[i];
                if (!connection.host ||
                    !connection.port ||
                    !connection.name ||
                    connection._readyState === 0) {
                    return ConnectionState.DEAD;
                }
            }

            return ConnectionState.ALIVE;
        }
    }
}

export default new Mongo(CONFIG.MONGO_URL).connect();