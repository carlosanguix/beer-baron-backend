import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import IDatabase from './infra/database/IDatabase';
import MongoDb from './infra/database/MongoDb';

export class Server {
    private app: express.Application;
    private database: IDatabase;

    constructor() {
        this.app = express();
        this.database = new MongoDb();
        this.config();
        this.middlewares();
        this.routes();
        this.initDB();
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
        this.app.use('/api/v1/auth', authRoutes);
    }
    
    private initDB(): void {
        this.database.connect();
    }

    public start(): void {
        const PORT = this.app.get('PORT');
        this.app.listen(PORT, () => {
            console.log(`BeerBaron on ${PORT}`);
        });
    }

}