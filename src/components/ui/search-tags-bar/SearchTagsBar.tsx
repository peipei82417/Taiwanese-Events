import React, { Fragment } from "react";
import classes from "./SearchTagsBar.module.css";
import SearchTag from "./SearchTag";
import { useRouter } from "next/router";
import { resetAllTags } from "utils/search-params-util";

interface SearchTagsBarProps {
    tags: Array<{ type: string; id: string }>;
}

const SearchTagsBar = (props: SearchTagsBarProps) => {
    const { tags } = props;
    const router = useRouter();
    const clearTagsHandler = () => {
        const queryParam = resetAllTags(router.query);
        router.push({ query: { ...queryParam } });
    };

    return (
        <Fragment>
            {tags.length > 0 && (
                <div className={classes["clear-btn"]}>
                    <button onClick={clearTagsHandler}>
                        <svg className={"icon"}>
                            <use xlinkHref={"sprite.svg#icon-spinner11"} />
                        </svg>
                        全部清除
                    </button>
                </div>
            )}
            <ul className={classes["search-tags-bar"]}>
                {tags.map((tag, idx) => (
                    <SearchTag key={idx} tag={tag} />
                ))}
            </ul>
        </Fragment>
    );
};
export default SearchTagsBar;
