import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

export class Server {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.middlewares();
        this.routes();
    }

    private config(): void {
        this.app.set('PORT', process.env.PORT || 3000);
    }

    private middlewares(): void {
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use(cors());
    }

    private routes(): void {
        // routes
    }
    
    public start(): void {
        const PORT = this.app.get('PORT');
        this.app.listen(PORT, () => {
            console.log(`BeerBaron on ${PORT}`);
        });
    }

}