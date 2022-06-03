
/**
 * 此腳本目的為 
 * 撈取文化部最新藝文資訊
 * 並更新至本地及遠端資料庫
 */
import { getTwoTimeDiff } from "../src/utils/date-util";
import { getCities, google_API_called_times } from "./helper";
import { MongoClient } from "mongodb";
import request from "request";
import fs from "fs";
import path from "path";

const url: string =
    "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=all";

const localDataPath = path.join(path.resolve("./"), "src/constant/events-data");

const seconds: number = new Date().getTime();
const today: string = new Date(seconds).toLocaleDateString();
const time: string = new Date(seconds).toLocaleTimeString();

const folderName: string = new Date(today).getTime().toString();
const todayFilePath = path.join(__dirname, "events", folderName);

console.log(`開始時間: ${today} ${time}`);

const main = (isDatabaseUpdate = false) => {
    fs.mkdir(todayFilePath, { recursive: true }, (err) => {
        if (err) {
            throw err.code;
        }
        console.log("------------成功創建資料夾------------");
    });

    request(url, (err, res) => {
        if (err) {
            throw new Error(err);
        }
        console.log("-------------開始獲取資料-------------");

        const summaries: any[] = [];
        const details: any = {};

        const events = JSON.parse(res.body);

        for (const event of events) {
            if (event["category"] === "16") {
                continue;
            }
            if (!details[event["UID"]]) {
                details[event["UID"]] = {
                    UID: event["UID"],
                    title: event["title"],
                    category: [event["category"]],
                    city: getCities(event["showInfo"]),
                    showInfo: event["showInfo"],
                    showUnit: event["showUnit"],
                    discountInfo: event["discountInfo"],
                    descriptionFilterHtml: event["descriptionFilterHtml"],
                    imageUrl: event["imageUrl"],
                    masterUnit: event["masterUnit"],
                    subUnit: event["subUnit"],
                    supportUnit: event["supportUnit"],
                    otherUnit: event["otherUnit"],
                    webSales: event["webSales"],
                    sourceWebPromote: event["sourceWebPromote"],
                    comment: event["comment"],
                    editModifyDate: event["editModifyDate"],
                    sourceWebName: event["sourceWebName"],
                    startDate: new Date(event["startDate"]).getTime(),
                    endDate: new Date(event["endDate"]).getTime(),
                    hitRate: event["hitRate"],
                };
            } else {
                details[event["UID"]]["category"] = [
                    ...details[event["UID"]]["category"],
                    event["category"],
                ];
            }
        }

        Object.values(details).forEach((event: any) => {
            const info = {
                UID: event["UID"],
                title: event["title"],
                city: getCities(event["showInfo"]),
                category: event["category"],
                imageUrl: event["imageUrl"],
                startDate: event["startDate"],
                endDate: event["endDate"],
                hitRate: event["hitRate"],
            };
            summaries.push(info);
        });
        const dateLen = summaries.length;
        const eventSummary = JSON.stringify(summaries, null, "\t");
        const eventDetail = JSON.stringify(details, null, "\t");

        fs.writeFile(
            `${todayFilePath}/events-summaries.json`,
            eventSummary,
            (err) => {
                if (err) {
                    console.error("Could not write file: %s", err);
                    return;
                }
            }
        );

        fs.writeFile(
            `${todayFilePath}/events-details.json`,
            eventDetail,
            (err) => {
                if (err) {
                    console.error("Could not write file: %s", err);
                    return;
                }
            }
        );

        fs.writeFile(
            `${localDataPath}/events-summaries.json`,
            eventSummary,
            (err) => {
                if (err) {
                    console.error("Could not write file: %s", err);
                    return;
                }
            }
        );

        fs.writeFile(
            `${localDataPath}/events-details.json`,
            eventDetail,
            (err) => {
                if (err) {
                    console.error("Could not write file: %s", err);
                    return;
                }
            }
        );

        let times = 0;
        for (let i = 0; i < google_API_called_times.length; i++) {
            times += google_API_called_times[i];
        }

        const seconds2: number = new Date().getTime();
        const today2: string = new Date(seconds2).toLocaleDateString();
        const time2: string = new Date(seconds2).toLocaleTimeString();

        console.log(`結束時間: ${today2} ${time2} `);
        console.log(`共花費 ${getTwoTimeDiff(seconds, seconds2, 3)} 秒`);

        const recode = {
            此資料夾創建時間: `${today} ${time}`,
            資料總數為: `${dateLen}筆`,
            "googla API總呼叫次數為": `${times}次`,
            結束時間: `${today2} ${time2}`,
            共花費: `${getTwoTimeDiff(seconds, seconds2, 3)}秒`,
        };

        const recodeData = JSON.stringify(recode, null, "\t");
        fs.writeFile(`${todayFilePath}/update-time.json`, recodeData, (err) => {
            if (err) {
                console.error("Could not write file: %s", err);
            }
        });

        if (isDatabaseUpdate) {
            const eventDetail = Array.from(Object.values(details));
            updateDatabase(summaries, eventDetail);
        }
    });
};

const updateDatabase = async (summaries: any[], details: any[]) => {
    console.log("------------開始更新資料庫------------");
    const seconds: number = new Date().getTime();

    const client = await MongoClient.connect("");

    const db = await client.db();

    const eventsSummaries = await db.collection("events-summaries");
    const eventsDetails = await db.collection("events-details");

    await eventsSummaries.insertMany(summaries);
    await eventsDetails.insertMany(details);

    client.close();
    const seconds2: number = new Date().getTime();
    console.log("------------資料庫更新完畢------------");

    const min = getTwoTimeDiff(seconds, seconds2, 2);
    const sec = getTwoTimeDiff(seconds, seconds2, 3);

    console.log(`共花費 ${min} 分 ${sec} 秒`);
};

main(true);
