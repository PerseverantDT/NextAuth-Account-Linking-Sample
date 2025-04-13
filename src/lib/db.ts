import { MongoClient, MongoClientOptions, ServerApiVersion } from 'mongodb';

if (process.env.MONGODB_URI === undefined) {
    throw new Error('Missing environment variable: MONGODB_URI');
}

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
};

let client: MongoClient | null = null;

export function connectMongoClient(): MongoClient
{
    if (client === null) {
        if (process.env.NODE_ENV === 'development') {
            const globalWithMongo = global as typeof globalThis & {
                _mongoClient?: MongoClient;
            };
        
            if (globalWithMongo._mongoClient === undefined) {
                globalWithMongo._mongoClient = new MongoClient(uri, options);
            }
            client = globalWithMongo._mongoClient;
        }
        else {
            client = new MongoClient(uri, options);
        }
    }

    return client;
}
