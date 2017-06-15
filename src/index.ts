import { createServer, Server } from 'http';
// import debug from 'debug';
import server from './server';
import CONFIG from './configuration';

// debug('ts-express:server');

const httpServer: Server = createServer(server);
httpServer.listen(CONFIG.PORT);
httpServer.on('error', onError);
httpServer.on('listening', onListening);

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
export default httpServer;
