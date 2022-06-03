import classes from "./SortingSelectorItem.module.css";

const SortingSelectorItem = (props) => {
    const { id, name, currSorting, onClickHandler } = props;

    const fontColor: React.CSSProperties = {
        color: currSorting[0] === id ? "black" : "rgb(150, 150, 150)",
    };

    return (
        <li
            className={classes["list-item"]}
            id={id}
            onClick={onClickHandler}
            style={fontColor}
        >
            {name}
            {currSorting[0] === id &&
                (currSorting[1] === "1" ? (
                    <svg className={classes["icon"]}>
                        <use xlinkHref={"sprite.svg#icon-arrow-down"} />
                    </svg>
                ) : (
                    <svg className={classes["icon"]}>
                        <use xlinkHref={"sprite.svg#icon-arrow-up"} />
                    </svg>
                ))}
        </li>
    );
};
export default SortingSelectorItem;
