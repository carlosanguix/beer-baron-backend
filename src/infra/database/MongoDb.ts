import IDatabase from './IDatabase';
import mongoose from 'mongoose';

class MongoDb implements IDatabase {
    connect() {
        try {
            const PORT = process.env.MONGO_PORT;
            console.log({mongoPort: PORT});
            mongoose.connect(
                process.env.URL_MONGO_DB || `mongodb://localhost:${PORT}/BeerBaron`,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                });
        }
        catch(e) {
            throw new Error('Cannot connect to mongoDB database. ' + e.message);
        }
    }
}

export default MongoDb;