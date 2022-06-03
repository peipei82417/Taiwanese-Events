import classes from "./About.module.css";

const About = () => {
    return (
        <div className={classes["container"]}>
            <h2>網站簡介</h2>
            <br />
            <p>
                此網站為個人Side Project，主要用以練習網頁工具及框架，
                所有活動資訊及文本均來自文化部的公開資料，
                如本站內容與文化部有所出入，
                請優先以文化部的即時更新內容做為參考。
            </p>
            <br />
            <p>資料庫更新時間暫定為每日 00:00</p>
        </div>
    );
};

export default About;
