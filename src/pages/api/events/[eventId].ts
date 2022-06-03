import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase, findDocumentById } from "utils/db-util";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method !== "GET") {
        return;
    }

    const { eventId } = req.query;

    let client;
    try {
        client = await connectDatabase(process.env.MONGODB_EVENTS_URI);
    } catch (error) {
        res.status(500).json({ message: 'Connecting to the database failed!' });
        return;
    }

    let details;
    try {
        details = await findDocumentById(client, "events-details", eventId);
        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Inserting data failed!' });
        return;
    }
    if (!details) {
        res.status(404).json({ message: '404 not found' });
    }
    res.status(200).json({ details: details });
};

export default handler;