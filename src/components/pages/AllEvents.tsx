import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { getEventsBySearchParams } from "utils/api-util";
import { setUrlSearchParams } from "utils/search-params-util";
import SearchBar from "components/layout/SearchBar";
import EventCardList from "components/ui/event-card/EventCardList";
import Loading from "components/layout/Loading";
import PageSelector from "components/ui/page-selector/PageSelector";
import SortingSelector from "components/ui/sorting-selector/SortingSelector";
import useDebounce from "hooks/useDebounce";
import classes from "./AllEvents.module.css";

const AllEvents = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [totalDataSize, setTotalDataSize] = useState(0);

    const router = useRouter();

    const fetchEvents = useDebounce(() => {
        const params = setUrlSearchParams(router.query);

        getEventsBySearchParams(params).then((data) => {
            setEvents(data.foundEvents);
            setTotalDataSize(data.size);
            if (data.size) {
                const totlePage = Math.ceil(data.size / 15);
                setTotalPage(totlePage);
            } else {
                setTotalPage(1);
            }
            setIsLoading(false);
        });
    }, 600);

    useEffect(() => {
        setIsLoading(true);
        fetchEvents();
    }, [router.query, fetchEvents]);

    return (
        <div className={classes["container"]}>
            <div className={classes["main"]}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <Fragment>
                        <SortingSelector totalDataSize={totalDataSize} />
                        <EventCardList events={events} />
                        <PageSelector totalPage={totalPage} />
                    </Fragment>
                )}
            </div>
            <div className={classes["aside"]}>
                <SearchBar />
            </div>
        </div>
    );
};

export default AllEvents;
