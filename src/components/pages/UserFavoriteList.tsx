import EventCardList from "components/ui/event-card/EventCardList";
import Loading from "components/layout/Loading";
import { useSession } from "next-auth/react";
import { listenerCount } from "process";
import { useState, useEffect, useRef } from "react";
import { getFavoriteListByEmail } from "utils/api-util";
import classes from "./UserFavoriteList.module.css";

const UserFavoriteList = () => {
    const { data: session } = useSession();
    const emailRef = useRef(session?.user.email);

    const [eventList, setEventList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const userEmail = emailRef.current;

        setIsLoading(true);

        getFavoriteListByEmail(userEmail).then((list) => {
            setEventList(list);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <div className="center">
                <Loading />
            </div>
        );
    }

    return (
        <div className={classes["main"]}>
            {eventList.length > 0 ? (
                <EventCardList events={eventList} />
            ) : (
                <div className="center">
                    <div className={classes["no-event"]}>
                        目前未收藏任何活動
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserFavoriteList;
