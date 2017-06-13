import { createServer } from 'http';
// import debug from 'debug';
import Server from './server';
import CONFIG from './configuration';

// debug('ts-express:server');

export const server = createServer(Server);
server.listen(CONFIG.PORT);
server.on('error', onError);
server.on('listening', onListening);

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
        throw error;
    }
    switch (error.code) {
        case 'EACCES':
            console.error(`PORT ${CONFIG.PORT} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`PORT ${CONFIG.PORT} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(): void {
    CONFIG.console();
}
