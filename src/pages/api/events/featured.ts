import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase, findFeaturedDocuments } from "utils/db-util";

//api/events/featured
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method !== "GET") {
        res.status(405).json({ message: `Method ${method} Not Allowed` });
        return;
    }

    let client;
    try {
        client = await connectDatabase(process.env.MONGODB_EVENTS_URI);
    } catch (error) {
        res.status(500).json({ message: 'Connecting to the database failed!' });
        return;
    }

    let result;
    try {
        result = await findFeaturedDocuments(client, "events-summaries");
        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Inserting data failed!' });
        return;
    }

    res.status(200).json({ featured: result.featured });
};
export default handler;