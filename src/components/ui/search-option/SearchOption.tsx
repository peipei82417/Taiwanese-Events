import { useRef, useState } from "react";
import classes from "./SearchOption.module.css";
import OptionList from "./OptionList";
import { useRouter } from "next/router";
import {
    getParamsByType,
    resetAllTagsByType,
    setQueryParams,
} from "utils/search-params-util";

interface SearchOptionProps {
    data: {
        uuid: string;
        type: string;
        list: Array<TagProps>;
        fontColor: string;
    };
    optionName: string;
}

const SearchOption = (props: SearchOptionProps) => {
    const { data } = props;

    const router = useRouter();

    const btnRef = useRef<HTMLDivElement | null>(null);

    const [isShowList, setIsShowList] = useState<boolean>(false);

    const clickOptionHandler = (tag: TagProps): void => {
        const queryParam = setQueryParams(tag, router.query);
        router.push({
            query: { ...queryParam },
        });
    };

    const clickResetHandler = (): void => {
        if (!router.query[data.type]) {
            return;
        }
        const queryParam = resetAllTagsByType(data.type, router.query);
        router.push({
            query: { ...queryParam },
        });
    };

    const clickBtnHandler = (): void => {
        if (!isShowList) {
            document.addEventListener("mousedown", clickDownHandler, true);
            setIsShowList(true);
        } else {
            setIsShowList(false);
        }
    };

    const clickDownHandler = (e: any): void => {
        const isClickInside =
            btnRef.current && !btnRef.current.contains(e.target) ? false : true;

        if (!isClickInside) {
            document.removeEventListener("mousedown", clickDownHandler, true);
            setIsShowList(false);
        }
    };

    return (
        <div ref={btnRef} className={classes["option-btn"]}>
            <button className={classes["btn"]} onClick={clickBtnHandler}>
                {props.optionName}&nbsp;
                <svg className={classes["icon"]}>
                    {isShowList ? (
                        <use xlinkHref={"sprite.svg#icon-chevron-down"} />
                    ) : (
                        <use xlinkHref={"sprite.svg#icon-chevron-up"} />
                    )}
                </svg>
            </button>
            {isShowList && (
                <OptionList
                    list={data.list}
                    selectedTags={getParamsByType(data.type, router.query)}
                    fontColor={data.fontColor}
                    clickOption={clickOptionHandler}
                    resetAllTags={clickResetHandler}
                />
            )}
        </div>
    );
};

export default SearchOption;
