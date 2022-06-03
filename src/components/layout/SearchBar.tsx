import SearchOption from "components/ui/search-option/SearchOption";
import SearchForm from "components/ui/search-form/SearchForm";
import SearchTagsBar from "components/ui/search-tags-bar/SearchTagsBar";
import OptionsData from "../../constant/project-data/options-data";
import classes from "./SearchBar.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getTagsQueryParams } from "utils/search-params-util";

const SearchBar = () => {
    const router = useRouter();

    const [tags, setTags] = useState<Array<{ type; id }>>([]);

    useEffect(() => {
        const arr = getTagsQueryParams(router.query);
        setTags(arr);
    }, [router.query]);

    return (
        <div className={classes["SearchBar"]}>
            <div className={classes["rwd-container"]}>
                <SearchForm
                    icon="sprite.svg#icon-magnifying-glass"
                    placeholder="Search"
                />
                <div className={classes["search-options"]}>
                    <SearchOption
                        data={OptionsData[0]}
                        optionName={"活動地區"}
                    />
                    <SearchOption
                        data={OptionsData[1]}
                        optionName={"活動月份"}
                    />
                    <SearchOption
                        data={OptionsData[2]}
                        optionName={"活動種類"}
                    />
                </div>
            </div>
            <SearchTagsBar tags={tags} />
        </div>
    );
};
export default SearchBar;
