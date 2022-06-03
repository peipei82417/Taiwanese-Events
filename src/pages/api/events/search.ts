import { NextApiRequest, NextApiResponse } from "next";
import { setQueryOptional } from "utils/search-params-util";
import { connectDatabase, findDocumentsByQuery } from "utils/db-util";

const getValidPageNumber = (page) => {
    let p = 0;
    if (page instanceof Array) {
        p = 1;
    } else {
        p = parseInt(page);
        if (isNaN(p) || p < 0) {
            p = 1;
        }
    }
    return p;
};

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

    const params = req.query;

    const query = setQueryOptional(params);
    const page = getValidPageNumber(params.page);
    const limit = 15;
    const skip = (page - 1) * limit;
    const sorting = {};
    if (params.sorting && params.sorting[0] && params.sorting[1]) {
        sorting[params.sorting[0]] = params.sorting[1];
    }

    let queryOptional;
    if (query.length > 0) {
        queryOptional = {
            '$and': [...query]
        };
    } else {
        queryOptional = {};
    }

    const queryParams = {
        searchQuery: queryOptional,
        sorting: sorting,
        skip: skip,
        limit: limit
    };

    let result;
    try {
        result = await findDocumentsByQuery(client, "events-summaries", queryParams);
        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Inserting data failed!' });
        return;
    }

    const { foundEvents, size } = result;
    console.log(size);
    res.status(200).json({ foundEvents: foundEvents, size: size });
};

export default handler;
