import { allCities } from "./common";

export let google_API_called = 0,
    google_API_called_times: number[] = [];

export const useGoogleAPI = () => {
    google_API_called++;
    return "need Google API Key";
};

export const getCities = (showInfo: any): string[] => {
    const cities: Set<string> = new Set();
    let latlong = new Array(2).fill("");
    let location = "";
    for (const info of showInfo) {
        if (info.location) {
            let locaTemp = info.location;
            let city = "",
                i = 0;
            locaTemp = locaTemp.replace(/[0-9a-zA-Z ]/g, "");
            while (city.length < 3 && locaTemp.length) {
                const isStr = Number.isNaN(parseInt(locaTemp[i]));
                if (isStr) {
                    city += locaTemp[i];
                }
                i += 1;
            }
            city = city.replace("台", "臺");
            if (location === city) {
                continue;
            }

            if (allCities.has(city)) {
                location = city;
                cities.add(location);
            } else if (!allCities.has(city)) {
                if (info.latitude && info.longitude) {
                    const latlongTemp = [info.latitude, info.longitude];
                    if (
                        latlong[0] === latlongTemp[0] &&
                        latlong[1] === latlongTemp[1]
                    ) {
                        continue;
                    } else {
                        latlong[0] = latlongTemp[0];
                        latlong[1] = latlongTemp[1];
                        const city = useGoogleAPI();
                        cities.add(city);
                    }
                } else {
                    cities.add("未提供");
                }
            }
        } else if (info.latitude && info.longitude) {
            const temp = [info.latitude, info.longitude];
            if (latlong[0] === temp[0] && latlong[1] === temp[1]) {
                continue;
            } else {
                latlong[0] = temp[0];
                latlong[1] = temp[1];
                const city = useGoogleAPI();
                cities.add(city);
            }
        } else {
            cities.add("未提供");
        }
        google_API_called_times.push(google_API_called);
        google_API_called = 0;
    }
    return Array.from(cities);
};

export const getDuration = (start: string, end: string): number[] => {
    return [new Date(start).getTime(), new Date(end).getTime()];
};
