import classes from "./Loading.module.css";

const Loading = () => {
    return (
        <div className={classes["loading"]}>
            <svg className={classes["loading-icon"]}>
                <use xlinkHref={"sprite.svg#icon-spinner2"} />
            </svg>
        </div>
    );
};

export default Loading;
