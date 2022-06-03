import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import {
    connectDatabase,
    findUserAndUpdateList,
    findUserByEmail,
} from "utils/db-util";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    const { usermail } = req.query;

    let client;
    try {
        client = await connectDatabase(process.env.MONGODB_EVENTS_URI);
    } catch (error) {
        res.status(500).json({ message: "Connecting to the database failed!" });
        return;
    }

    const user = await findUserByEmail(client, "users", usermail);

    switch (method) {
        case "GET":
            if (user["favoritelist"]) {
                const favoritelist = user["favoritelist"];
                const seconds: number = new Date().getTime();
                const today: string = new Date(seconds).toLocaleDateString();
                const todayTimeStamp: number = new Date(today).getTime();
                const list = favoritelist.filter((item) => item.endDate >= todayTimeStamp);
                res.status(200).json({ favoritelist: list });
                await findUserAndUpdateList(client, "users", usermail, list);
            } else {
                res.status(200).json({ favoritelist: [] });
            }
            client.close();
            break;
        case "POST":
            const { event } = req.body;
            let favoritelist: any[] = user.favoritelist ? user.favoritelist : [];
            const idx = favoritelist.find((item) => item.UID === event.UID);

            if (!idx) {
                favoritelist.unshift(event);
            } else {
                favoritelist = favoritelist.filter((item) => item.UID !== event.UID);
            }

            await findUserAndUpdateList(client, "users", usermail, favoritelist);
            res.status(200).json({ message: "Update Success." });
            client.close();
            break;
        default:
            res.status(405).json({ message: `Method ${method} Not Allowed` });
            break;
    }

    client.close();
};

export default handler;
