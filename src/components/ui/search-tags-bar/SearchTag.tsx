import React from "react";
import classes from "./SearchTag.module.css";
import {
    getColorByType,
    getTagNameByTypeId,
} from "../../../constant/SearchTagTypeId";
import { setQueryParams } from "utils/search-params-util";
import { useRouter } from "next/router";

interface SearchTagProps {
    tag: { type: string; id: string };
}

const SearchTag = (props: SearchTagProps) => {
    const { tag } = props;
    const fontColor: React.CSSProperties = { color: getColorByType(tag.type) };
    const router = useRouter();

    const onRemove = (tag) => {
        const queryParam = setQueryParams(tag, router.query);
        router.push({ query: { ...queryParam } });
    };

    return (
        <div className={classes["tag"]}>
            <label className={classes["label"]} style={fontColor}>
                {getTagNameByTypeId(tag.type, tag.id)}
            </label>
            <button
                className={classes["btn"]}
                onClick={onRemove.bind(null, tag)}
            >
                &#215;
            </button>
        </div>
    );
};
export default SearchTag;
