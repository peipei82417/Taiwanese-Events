import EventCard from "./EventCard";
import classes from "./EventCardList.module.css";

interface EventCardProps {
    events: EventSummary[];
}

const EventCardList = (props: EventCardProps) => {
    const { events } = props;

    return (
        <div className={classes["event-card-list"]}>
            {events.map((event, idx) => (
                <EventCard key={event.UID} id={idx} event={event} />
            ))}
        </div>
    );
};

export default EventCardList;
