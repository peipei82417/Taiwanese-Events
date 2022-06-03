import { MongoClient } from "mongodb";

export const connectDatabase = async (url) => {
    const client = await MongoClient.connect(url);
    return client;
};

export const findFeaturedDocuments = async (client, collection) => {
    const db = client.db("events");
    const eventsSummaries = await db.collection(collection);
    const featured = await eventsSummaries.find().sort({ hitRate: -1 }).limit(15).toArray();
    return { featured: featured };
};

export const findDocumentById = async (client, collection, UID) => {
    const db = client.db("events");
    const details = await db.collection(collection).findOne({ UID: UID });
    return details;
};

export const findUserByEmail = async (client, collection, userEmail) => {
    const db = await client.db("auth");
    const user = await db.collection(collection).findOne({ email: userEmail });
    return user;
};

export const findUserAndUpdateList = async (client, collection, userEmail, favoritelist) => {
    const db = client.db("auth");
    const update = {
        "$set": {
            "favoritelist": favoritelist
        }
    };
    const user = await db.collection(collection).findOneAndUpdate({ email: userEmail }, update);
    return user;
};

export const findDocumentsByQuery = async (client, collection, queryParams) => {
    const { searchQuery, sorting, skip, limit } = queryParams;
    const db = client.db("events");
    const eventsSummaries = await db.collection(collection);
    const foundEvents = await eventsSummaries
        .find(searchQuery)
        .sort(sorting)
        .skip(skip)
        .limit(limit)
        .toArray();
    const size = await eventsSummaries.countDocuments(searchQuery);
    return { foundEvents: foundEvents, size: size };
};
