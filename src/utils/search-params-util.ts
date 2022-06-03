import { getTagNameByTypeId } from "constant/SearchTagTypeId";
import { getMonthInterval } from "./date-util";

enum SearchParam {
    CITY = "city",
    MONTH = "month",
    CATEGORY = "category",
    SEARCHFORM = "searchForm",
    SORTING = "sorting",
    PAGE = "page",
}

export const getTagsQueryParams = (query) => {
    const { city, month, category } = query;
    const arr: Array<{ type; id }> = [];
    if (city) {
        if (city instanceof Array) {
            city.forEach((city) => {
                arr.push({ type: "city", id: city });
            });
        } else {
            arr.push({ type: "city", id: city });
        }
    }
    if (month) {
        if (month instanceof Array) {
            month.forEach((month) => {
                arr.push({ type: "month", id: month });
            });
        } else {
            arr.push({ type: "month", id: month });
        }
    }
    if (category) {
        if (category instanceof Array) {
            category.forEach((category) => {
                arr.push({ type: "category", id: category });
            });
        } else {
            arr.push({ type: "category", id: category });
        }
    }
    return arr;
};

export const getParamsByType = (type, query) => {
    return query[type];
};

export const setQueryParams = (tag, query) => {
    const { type, id } = tag;
    const { city, month, category, searchForm, sorting, page } = query;

    const queryParam = {
        city,
        month,
        category,
        searchForm,
        sorting,
        page,
    };

    const prevVal = queryParam[type];

    switch (type) {
        case SearchParam.CITY:
        case SearchParam.MONTH:
        case SearchParam.CATEGORY:
            if (prevVal) {
                if (prevVal instanceof Array) {
                    const idx = prevVal.findIndex((v) => v === id);
                    if (idx === -1) {
                        queryParam[type] = [...prevVal, id];
                    } else {
                        queryParam[type] = prevVal.filter((v) => v !== id);
                        if (prevVal.length === 1) {
                            queryParam[type] = id;
                        }
                    }
                } else {
                    if (queryParam[type] !== id) {
                        queryParam[type] = [prevVal, id];
                    } else {
                        delete queryParam[type];
                    }
                }
            } else {
                queryParam[type] = id;
            }
            queryParam[SearchParam.PAGE] = 1;
            break;

        case SearchParam.SEARCHFORM:
        case SearchParam.SORTING:
            queryParam[type] = id;
            queryParam[SearchParam.PAGE] = 1;
            break;
        case SearchParam.PAGE:
            queryParam[type] = id;
            break;
    }
    return queryParam;
};

export const setQueryOptional = (params) => {
    const query = new Array();
    const { city, month, category, searchForm } = params;

    if (city) {
        const cityQuery: { $or: any[] } = {
            $or: [],
        };
        if (city instanceof Array) {
            city.forEach((s) => {
                cityQuery[`$or`] = [
                    ...cityQuery[`$or`],
                    { city: getTagNameByTypeId("city", s) },
                ];
            });
        } else {
            cityQuery[`$or`] = [{ city: getTagNameByTypeId("city", city) }];
        }
        if (cityQuery[`$or`].length > 0) {
            query.push(cityQuery);
        }
    }
    if (month) {
        const monthQuery: { $or: any[] } = {
            $or: [],
        };
        if (month instanceof Array) {
            month.forEach((s) => {
                const interval = getMonthInterval(s);
                monthQuery[`$or`] = [
                    ...monthQuery[`$or`],
                    { startDate: { $gte: interval[0], $lte: interval[1] } },
                ];
            });
        } else {
            const interval = getMonthInterval(month);
            monthQuery[`$or`] = [
                { startDate: { $gte: interval[0], $lte: interval[1] } },
            ];
        }
        if (monthQuery[`$or`].length > 0) {
            query.push(monthQuery);
        }
    }

    if (category) {
        const categoryQuery: { $or: any[] } = {
            $or: [],
        };
        if (category instanceof Array) {
            category.forEach((s) => {
                categoryQuery["$or"] = [
                    ...categoryQuery["$or"],
                    { category: s },
                ];
            });
        } else {
            categoryQuery["$or"] = [{ category: category }];
        }
        if (categoryQuery["$or"].length > 0) {
            query.push(categoryQuery);
        }
    }
    if (searchForm) {
        query.push({ title: { $regex: `${searchForm}` } });
    }
    return query;
};

export const setUrlSearchParams = (query) => {
    const params = new URLSearchParams();
    for (const key in query) {
        if (query[key]) {
            if (query[key] instanceof Array) {
                for (const key2 in query[key]) {
                    params.append(key, query[key][key2]);
                }
            } else {
                params.append(key, query[key]);
            }
        }
    }

    if (params.toString() === "") {
        return "page=1";
    }
    return params.toString();
};

export const resetAllTags = (query) => {
    query[SearchParam.CITY] = ""
    query[SearchParam.MONTH] = ""
    query[SearchParam.CATEGORY] = ""
    return query
}
export const resetAllTagsByType = (type: string, query) => {
    switch (type) {
        case SearchParam.CITY:
            query[SearchParam.CITY] = ""
            break
        case SearchParam.MONTH:
            query[SearchParam.MONTH] = ""
            break
        case SearchParam.CATEGORY:
            query[SearchParam.CATEGORY] = ""
            break
    }
    return query;
}