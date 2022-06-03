import classes from "./Details.module.css";
import Image from "next/image";
import { Fragment } from "react";
import AddToListBtn from "components/ui/add-to-list-btn/AddToListBtn";

interface DetailsProps {
    eventDetail: EventDetail;
    isFavorite: boolean;
}

interface ShowInfoProps {
    id: number;
    showInfo: ShowInfo;
}

export const ShowInfo = (props: ShowInfoProps) => {
    const { id, showInfo } = props;

    return (
        <Fragment>
            <div className={classes["main-head"]}>活動資訊{id + 1}</div>
            <div className={classes["info"]}>
                <ul>
                    <DetailItemWithIcon
                        str={showInfo.time + " 至 " + showInfo.endTime}
                        iconName={"alarm"}
                        itemName={"活動時間"}
                    />
                    <DetailItemWithIcon
                        str={showInfo.locationName + " - " + showInfo.location}
                        iconName={"location2"}
                        itemName={"活動地點"}
                    />
                    <DetailItemWithIcon
                        str={showInfo.price}
                        iconName={"coin-dollar"}
                        itemName={"費用資訊"}
                    />
                </ul>
            </div>
        </Fragment>
    );
};

export const EventImage = (props: any) => {
    const imgUrl = props.img ? props.img : "/images/NoImage.jpg";
    return <Image src={imgUrl} alt={props.title} width={2048} height={1024} />;
};

export const DetailItemWithIcon = (props: any) => {
    const { str, iconName, itemName } = props;
    return (
        <li>
            <Image
                src={`/SVG/${iconName}.svg`}
                alt={`My ${iconName} SVG`}
                width={17}
                height={17}
            />
            &nbsp;&nbsp;
            <div>{itemName}</div>
            <p>{str}</p>
        </li>
    );
};

export const DetailItem = (props: any) => {
    const { str, itemName } = props;
    return (
        <li>
            <div>{itemName}</div>
            <p>{str}</p>
        </li>
    );
};

export const DetailLink = (props: any) => {
    const { str, link, linkName } = props;
    return (
        <li>
            <div>{linkName}</div>
            <p>
                <a href={link}>{str}</a>
            </p>
        </li>
    );
};

const Details = (props: DetailsProps) => {
    const { eventDetail, isFavorite } = props;

    return (
        <div className={classes["container"]}>
            <AddToListBtn details={eventDetail} isFavorite={isFavorite} />

            <div className={classes["container-title"]}>
                {eventDetail.title}
            </div>

            <EventImage img={eventDetail.imageUrl} alt={eventDetail.title} />

            <div className={classes["main"]}>
                {eventDetail.showInfo.map((info, idx) => (
                    <ShowInfo key={idx} id={idx} showInfo={info} />
                ))}
                {eventDetail.descriptionFilterHtml && (
                    <Fragment>
                        <div className={classes["main-head"]}>詳細介紹</div>
                        <div className={classes["info"]}>
                            <pre className={classes["description"]}>
                                {eventDetail.descriptionFilterHtml}
                            </pre>
                        </div>
                    </Fragment>
                )}

                <div className={classes["main-head"]}>
                    相關單位 &nbsp;
                    <Image
                        src="/SVG/bullhorn.svg"
                        alt="My bullhorn SVG"
                        width={17}
                        height={17}
                    />
                </div>
                <div className={classes["info"]}>
                    <ul>
                        {eventDetail.showUnit.length > 0 && (
                            <DetailItem
                                str={eventDetail.showUnit}
                                itemName={"演出單位"}
                            />
                        )}
                        {eventDetail.sourceWebName && (
                            <DetailLink
                                str={eventDetail.sourceWebName}
                                link={eventDetail.sourceWebPromote}
                                linkName={"相關網址"}
                            />
                        )}
                        {eventDetail.webSales && (
                            <DetailLink
                                str={eventDetail.webSales}
                                link={eventDetail.webSales}
                                linkName={"售票網址"}
                            />
                        )}
                        {eventDetail.masterUnit.length > 0 && (
                            <DetailItem
                                str={eventDetail.masterUnit}
                                itemName={"主辦單位"}
                            />
                        )}
                        {eventDetail.subUnit.length > 0 && (
                            <DetailItem
                                str={eventDetail.subUnit}
                                itemName={"協辦單位"}
                            />
                        )}
                        {eventDetail.supportUnit.length > 0 && (
                            <DetailItem
                                str={eventDetail.supportUnit}
                                itemName={"贊助單位"}
                            />
                        )}
                        {eventDetail.otherUnit.length > 0 && (
                            <DetailItem
                                str={eventDetail.otherUnit}
                                itemName={"其他單位"}
                            />
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Details;
