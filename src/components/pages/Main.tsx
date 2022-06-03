import EventCardList from "components/ui/event-card/EventCardList";
import { HomeProps } from "pages";
import classes from "./Main.module.css";

const Main = (props: HomeProps) => {
    const { events } = props;

    return (
        <div className={classes["main"]}>
            <div className={classes["main-hot"]}>熱門活動</div>
            <EventCardList events={events} />
        </div>
    );
};

export default Main;
