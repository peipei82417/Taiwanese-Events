import { v4 as uuidv4 } from "uuid";

import classes from "./OptionList.module.css";

interface OptionListProps {
    list: Array<TagProps>;
    selectedTags: string | string[] | undefined;
    fontColor: string;
    clickOption: (tag: TagProps) => void;
    resetAllTags: () => void;
}

const OptionList = (props: OptionListProps) => {
    const { list, selectedTags } = props;

    const clickHandler = (tag: TagProps) => {
        props.clickOption(tag);
    };

    const fontColor: React.CSSProperties = { color: props.fontColor };

    const isSelectedTags = (tag): boolean => {
        if (selectedTags) {
            if (selectedTags instanceof Array) {
                const idx = selectedTags.findIndex((id) => id === tag.id);
                if (idx >= 0) {
                    return true;
                }
            } else {
                if (selectedTags === tag.id) {
                    return true;
                }
            }
        }
        return false;
    };

    return (
        <div className={classes["container"]}>
            {list.map((tag) => {
                return (
                    <button
                        key={uuidv4()}
                        className={classes["item"]}
                        onClick={clickHandler.bind(null, tag)}
                    >
                        <div className={classes["context"]} style={fontColor}>
                            {tag.name}
                            {isSelectedTags(tag) && (
                                <span className={classes["icon"]}>
                                    &#10003;
                                </span>
                            )}
                        </div>
                    </button>
                );
            })}
            <button
                className={classes["clear-btn"]}
                onClick={props.resetAllTags}
            >
                全部清除
            </button>
        </div>
    );
};
export default OptionList;
