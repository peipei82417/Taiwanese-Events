declare interface TagProps {
    uuid: string,
    id: string,
    name: string,
    type: string,
    color: string;
}

declare interface EventSummary {
    UID: string,
    title: string;
    city: Array<string>,
    category: Array<string>,
    imageUrl: string,
    startDate: number,
    endDate: number,
    hitRate: number,
}

declare interface EventDetail {
    version: string;
    UID: string;
    title: string;
    city: Array<string>;
    category: Array<string>;
    showInfo: Array<ShowInfo>;
    showUnit: string,
    discountInfo: string,
    descriptionFilterHtml: string,
    imageUrl: string,
    masterUnit: Array<string>,
    subUnit: Array<string>,
    supportUnit: Array<string>,
    otherUnit: Array<string>,
    webSales: string,
    sourceWebPromote: string,
    comment: string,
    editModifyDate: string,
    sourceWebName: string,
    startDate: string,
    endDate: string,
    hitRate: number;
}

declare interface ShowInfo {
    time: string;
    location: string;
    locationName: string;
    onSales: string;
    price: string;
    latitude: string | null;
    longitude: string | null;
    endTime: string;
}
