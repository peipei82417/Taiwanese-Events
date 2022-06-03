const fetchData = async (url, method, successCallback) => {
    if (!method) {
        method = {
            method: "GET",
            headers: headers,
        };
    }
    return await fetch(url, method)
        .then(validateResponse)
        .then(parseResponseToJSON)
        .then(successCallback)
        .catch(failCallback);
};

const validateResponse = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

const parseResponseToJSON = async (response) => {
    return await response.json();
};

const failCallback = (error) => {
    console.log(error);
};

const headers = {
    "Content-Type": "application/json",
};

//----------events-----------
export const getFeaturedEvents = async () => {
    const url = `${process.env.DOMAIN}api/events/featured`;
    const successCallback = (response) => {
        return response.featured;
    };

    return await fetchData(url, null, successCallback);
};

export const getEventDetailsById = async (title: string) => {
    const url = `${process.env.DOMAIN}api/events/${title}`;
    const successCallback = (response) => {
        return response.details;
    };

    return await fetchData(url, null, successCallback);
};

export const getEventsBySearchParams = async (params: string) => {
    const url = `${process.env.DOMAIN}api/events/search/?${params}`;
    const successCallback = (response) => {
        return response;
    };

    return await fetchData(url, null, successCallback);
};

export const checkIsFavorite = async (event, email) => {
    const list: any[] = await getFavoriteListByEmail(email);

    if (list) {
        const idx = list.find((i) => i.UID === event.UID);
        if (!idx) {
            return false;
        }
        return true;
    } else {
        return false;
    }
};

//----------users-----------
export const getFavoriteListByEmail = async (email) => {
    const url = `${process.env.DOMAIN}api/${email}/favoritelist`;
    const successCallback = (response) => {
        return response.favoritelist;
    };
    return await fetchData(url, null, successCallback);
};


export const patchEventToFavoriteList = async (email, event) => {
    const url = `${process.env.DOMAIN}api/${email}/favoritelist`; const method = {
        method: "POST",
        body: JSON.stringify({ event: event }),

        headers: headers,
    };
    const successCallback = (response) => {
        console.log(response.message);
    };

    return await fetchData(url, method, successCallback);
};
