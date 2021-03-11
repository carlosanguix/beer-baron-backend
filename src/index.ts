import dotenv from 'dotenv';
import { Server } from './server';

class Main {
    private server: Server;

    constructor() {
        dotenv.config();

        this.server = new Server();
        this.start();
    }

    private start(): void {
        this.server.start()
    }

}

new Main();