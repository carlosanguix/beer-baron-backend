import IDatabase from './IDatabase';
import mongoose from 'mongoose';

class MongoDb implements IDatabase {
    connect() {
        try {
            const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
            const MONGO_URL = `mongodb+srv://ruben:${MONGO_PASSWORD}@mongo-fallero.s8xta.mongodb.net/beerBaron_test?retryWrites=true&w=majority`
            mongoose.connect(
                MONGO_URL,
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