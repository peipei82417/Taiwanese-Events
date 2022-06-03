export const getColorByType = (type: string) => {
    switch (type) {
        case "city":
            return "#00af9b";
        case "month":
            return "#ffb700";
        case "category":
            return "#1fb9ecf2";
        default:
            return "#fff";
    }
};

export const getTagNameByTypeId = (type: string, id: string): string => {
    switch (type) {
        case "city":
            switch (id) {
                case "1":
                    return "臺北市";
                case "2":
                    return "新北市";
                case "3":
                    return "桃園市";
                case "4":
                    return "臺中市";
                case "5":
                    return "臺南市";
                case "6":
                    return "高雄市";
                case "7":
                    return "基隆市";
                case "8":
                    return "新竹市";
                case "9":
                    return "嘉義市";
                case "10":
                    return "宜蘭縣";
                case "11":
                    return "新竹縣";
                case "12":
                    return "苗栗縣";
                case "13":
                    return "彰化縣";
                case "14":
                    return "南投縣";
                case "15":
                    return "雲林縣";
                case "16":
                    return "嘉義縣";
                case "17":
                    return "屏東縣";
                case "18":
                    return "花蓮縣";
                case "19":
                    return "臺東縣";
                case "20":
                    return "澎湖縣";
                default:
                    return "";
            }
        case "month":
            const date = new Date(parseInt(id));
            if (date.getMonth() + 1 < 10) {
                return `${date.getFullYear()}/0${date.getMonth() + 1}`;
            } else {
                return `${date.getFullYear()}/${date.getMonth() + 1}`;
            }
        case "category":
            switch (id) {
                case "1":
                    return "音樂";
                case "2":
                    return "戲劇";
                case "3":
                    return "舞蹈";
                case "4":
                    return "親子活動";
                case "5":
                    return "獨立音樂";
                case "6":
                    return "展覽";
                case "7":
                    return "講座";
                case "8":
                    return "電影";
                case "11":
                    return "綜藝活動";
                case "13":
                    return "競賽活動";
                case "14":
                    return "徵選活動";
                case "15":
                    return "其他";
                case "17":
                    return "演唱會";
                case "19":
                    return "研習課程";
                case "200":
                    return "閱讀活動";
                default:
                    return "";

            }
    }
    return "";
}
