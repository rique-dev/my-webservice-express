import { createServer } from 'http';
// import debug from 'debug';
import Server from './server';
import CONFIG from './configuration';

// debug('ts-express:server');

const webService = createServer(Server);

webService.on('error', onError);
webService.on('listening', onListening);

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = (typeof CONFIG.PORT === 'string') ? 'Pipe ' + CONFIG.PORT : 'PORT ' + CONFIG.PORT;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(): void {
    const addr = webService.address();
    const bind = (typeof addr === 'string') ? `pipe ${addr}` : `PORT ${addr.port}`;
    // debug(`Listening on ${bind}`);
}