import { MongoClient } from 'mongodb'

export const mongoClient = new MongoClient(process.env.MONGODB_URI)
/** shared connection pool */
export const mongoDBP = mongoClient.connect().then((c) => c.db())