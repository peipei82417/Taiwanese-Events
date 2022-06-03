import { getTagNameByTypeId } from "constant/SearchTagTypeId";
import Image from "next/image";
import Link from "next/link";
import { getTwoTimeDiff } from "utils/date-util";
import classes from "./EventCard.module.css";

interface EventCardProps {
    id: number;
    event: EventSummary;
}

export const EventImage = (props: any) => {
    const imgUrl = props.img ? props.img : "/images/NoImage.jpg";
    return (
        <div className={classes["image"]}>
            <Image src={imgUrl} alt={props.title} width={340} height={340} />
        </div>
    );
};

const EventCard = (props: EventCardProps) => {
    const exploreLink = `/events/${props.event.UID}`;

    const { imageUrl, title, category, startDate, endDate } = props.event;

    const rowColor =
        props.id % 2 === 0
            ? "var(--color-primary-light)"
            : "var(--color-primary)";

    const backgroundColor: React.CSSProperties = { backgroundColor: rowColor };

    const countdown = (startTime: number) => {
        const now = new Date().getTime();
        const diff = getTwoTimeDiff(now, startTime, 0) + 1;
        return diff <= 0 ? "正在進行" : `倒數${diff}天`;
    };

    return (
        <Link href={exploreLink} passHref>
            <div className={classes["container"]} style={backgroundColor}>
                <EventImage img={imageUrl} alt={title} />
                <div className={classes["countdown"]}>
                    {countdown(startDate)}
                </div>
                <div className={classes["card-info"]}>
                    <time className={classes["card-date"]}>
                        <svg viewBox="0 0 24 24" className={classes["icon"]}>
                            <path
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        &nbsp;
                        {new Date(startDate).toLocaleDateString()}
                        {startDate !== endDate &&
                            " - " + new Date(endDate).toLocaleDateString()}
                    </time>
                    <div className={classes["card-title"]}>{title}</div>
                    <div>
                        <div className={classes["card-category"]}>
                            {category.map((item, idx) => (
                                <div key={idx}>
                                    {`#${getTagNameByTypeId("category", item)}`}
                                    &nbsp;
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
export default EventCard;
