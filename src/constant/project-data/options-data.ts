import { v4 as uuidv4 } from "uuid";

enum TagType {
    CITY = "city",
    MONTH = "month",
    CATEGORY = "category",
}

enum TagColor {
    GREEN = "#00af9b",
    YELLO = "#ffb700",
    BLUE = "#1fb9ecf2",
}

const locationTagList: Array<TagProps> = [
    {
        uuid: uuidv4(),
        id: "1",
        name: "臺北市",
        type: TagType.CITY,
        color: TagColor.GREEN
    },
    {
        uuid: uuidv4(),
        id: "2",
        name: "新北市",
        type: TagType.CITY,
        color: TagColor.GREEN
    },
    {
        uuid: uuidv4(),
        id: "3",
        name: "桃園市",
        type: TagType.CITY,
        color: TagColor.GREEN
    },
    {
        uuid: uuidv4(),
        id: "4",
        name: "臺中市",
        type: TagType.CITY,
        color: TagColor.GREEN
    },
    {
        uuid: uuidv4(),
        id: "5",
        name: "臺南市",
        type: TagType.CITY,
        color: TagColor.GREEN
    },
    {
        uuid: uuidv4(),
        id: "6",
        name: "高雄市",
        type: TagType.CITY,
        color: TagColor.GREEN
    },
    {
        uuid: uuidv4(),
        id: "7",
        name: "基隆市",
        type: TagType.CITY,
        color: TagColor.GREEN
    },
    {
        uuid: uuidv4(),
        id: "8",
        name: "新竹市",
        type: TagType.CITY,
        color: TagColor.GREEN
    },
    {
        uuid: uuidv4(),
        id: "9",
        name: "嘉義市",
        type: TagType.CITY,
        color: TagColor.GREEN
    },
    {
        uuid: uuidv4(),
        id: "10",
        name: "宜蘭縣",
        type: TagType.CITY,
        color: TagColor.GREEN
    },
    {
        uuid: uuidv4(),
        id: "11",
        name: "新竹縣",
        type: TagType.CITY,
        color: TagColor.GREEN
    },
    {
        uuid: uuidv4(),
        id: "12",
        name: "苗栗縣",
        type: TagType.CITY,
        color: TagColor.GREEN
    },
    {
        uuid: uuidv4(),
        id: "13",
        name: "彰化縣",
        type: TagType.CITY,
        color: TagColor.GREEN
    },
    {
        uuid: uuidv4(),
        id: "14",
        name: "南投縣",
        type: TagType.CITY,
        color: TagColor.GREEN
    },
    {
        uuid: uuidv4(),
        id: "15",
        name: "雲林縣",
        type: TagType.CITY,
        color: TagColor.GREEN
    },
    {
        uuid: uuidv4(),
        id: "16",
        name: "嘉義縣",
        type: TagType.CITY,
        color: TagColor.GREEN
    },
    {
        uuid: uuidv4(),
        id: "17",
        name: "屏東縣",
        type: TagType.CITY,
        color: TagColor.GREEN
    },
    {
        uuid: uuidv4(),
        id: "18",
        name: "花蓮縣",
        type: TagType.CITY,
        color: TagColor.GREEN
    },
    {
        uuid: uuidv4(),
        id: "19",
        name: "臺東縣",
        type: TagType.CITY,
        color: TagColor.GREEN
    },
    {
        uuid: uuidv4(),
        id: "20",
        name: "澎湖縣",
        type: TagType.CITY,
        color: TagColor.GREEN
    },
];

const time = (id: string) => {
    return new Date(id).getTime().toString();
};
const monthTagList: Array<TagProps> = [
    {
        uuid: uuidv4(),
        id: "1654012800000",
        name: "2022/06",
        type: TagType.MONTH,
        color: TagColor.YELLO
    },
    {
        uuid: uuidv4(),
        id: "1656604800000",
        name: "2022/07",
        type: TagType.MONTH,
        color: TagColor.YELLO
    },
    {
        uuid: uuidv4(),
        id: "1659283200000",
        name: "2022/08",
        type: TagType.MONTH,
        color: TagColor.YELLO
    },
    {
        uuid: uuidv4(),
        id: "1661961600000",
        name: "2022/09",
        type: TagType.MONTH,
        color: TagColor.YELLO
    },
    {
        uuid: uuidv4(),
        id: "1664553600000",
        name: "2022/10",
        type: TagType.MONTH,
        color: TagColor.YELLO
    },
    {
        uuid: uuidv4(),
        id: "1667232000000",
        name: "2022/11",
        type: TagType.MONTH,
        color: TagColor.YELLO
    },
    {
        uuid: uuidv4(),
        id: "1669824000000",
        name: "2022/12",
        type: TagType.MONTH,
        color: TagColor.YELLO
    },
    {
        uuid: uuidv4(),
        id: "1672502400000",
        name: "2023/01",
        type: TagType.MONTH,
        color: TagColor.YELLO
    },
    {
        uuid: uuidv4(),
        id: "1675180800000",
        name: "2023/02",
        type: TagType.MONTH,
        color: TagColor.YELLO
    },
    {
        uuid: uuidv4(),
        id: "1677600000000",
        name: "2023/03",
        type: TagType.MONTH,
        color: TagColor.YELLO
    },
    {
        uuid: uuidv4(),
        id: "1680278400000",
        name: "2023/04",
        type: TagType.MONTH,
        color: TagColor.YELLO
    },
    {
        uuid: uuidv4(),
        id: "1682899200000",
        name: "2023/05",
        type: TagType.MONTH,
        color: TagColor.YELLO
    }
];

const categoryTagList: Array<TagProps> = [
    {
        uuid: uuidv4(),
        id: "1",
        name: "音樂",
        type: TagType.CATEGORY,
        color: TagColor.BLUE
    },
    {
        uuid: uuidv4(),
        id: "2",
        name: "戲劇",
        type: TagType.CATEGORY,
        color: TagColor.BLUE
    },
    {
        uuid: uuidv4(),
        id: "3",
        name: "舞蹈",
        type: TagType.CATEGORY,
        color: TagColor.BLUE
    },
    {
        uuid: uuidv4(),
        id: "4",
        name: "親子活動",
        type: TagType.CATEGORY,
        color: TagColor.BLUE
    },
    {
        uuid: uuidv4(),
        id: "5",
        name: "獨立音樂",
        type: TagType.CATEGORY,
        color: TagColor.BLUE
    },
    {
        uuid: uuidv4(),
        id: "6",
        name: "展覽",
        type: TagType.CATEGORY,
        color: TagColor.BLUE
    },
    {
        uuid: uuidv4(),
        id: "7",
        name: "講座",
        type: TagType.CATEGORY,
        color: TagColor.BLUE
    },
    {
        uuid: uuidv4(),
        id: "8",
        name: "電影",
        type: TagType.CATEGORY,
        color: TagColor.BLUE
    },
    {
        uuid: uuidv4(),
        id: "11",
        name: "綜藝活動",
        type: TagType.CATEGORY,
        color: TagColor.BLUE
    },
    {
        uuid: uuidv4(),
        id: "13",
        name: "競賽活動",
        type: TagType.CATEGORY,
        color: TagColor.BLUE
    },
    {
        uuid: uuidv4(),
        id: "14",
        name: "徵選活動",
        type: TagType.CATEGORY,
        color: TagColor.BLUE
    },
    {
        uuid: uuidv4(),
        id: "15",
        name: "其他",
        type: TagType.CATEGORY,
        color: TagColor.BLUE
    },
    {
        uuid: uuidv4(),
        id: "17",
        name: "演唱會",
        type: TagType.CATEGORY,
        color: TagColor.BLUE
    },
    {
        uuid: uuidv4(),
        id: "19",
        name: "研習課程",
        type: TagType.CATEGORY,
        color: TagColor.BLUE
    },
    {
        uuid: uuidv4(),
        id: "200",
        name: "閱讀活動",
        type: TagType.CATEGORY,
        color: TagColor.BLUE
    },
];

const OptionsData = [
    {
        uuid: uuidv4(),
        type: TagType.CITY,
        list: locationTagList,
        fontColor: TagColor.GREEN,
    },
    {
        uuid: uuidv4(),
        type: TagType.MONTH,
        list: monthTagList,
        fontColor: TagColor.YELLO,
    },
    {
        uuid: uuidv4(),
        type: TagType.CATEGORY,
        list: categoryTagList,
        fontColor: TagColor.BLUE,
    },
];

export default OptionsData;


