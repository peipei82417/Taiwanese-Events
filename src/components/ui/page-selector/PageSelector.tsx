import useDebounce from "hooks/useDebounce";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getParamsByType, setQueryParams } from "utils/search-params-util";
import classes from "./PageSelector.module.css";

interface PageSelectorProps {
    totalPage: number;
}

const PageSelector = (props: PageSelectorProps) => {
    const { totalPage } = props;
    const [currPage, setCurrPage] = useState(1);
    const router = useRouter();

    const jumpPageHandler = useDebounce((e) => {
        const jumpPage = parseInt(e.target.value);
        if (
            jumpPage <= 0 ||
            jumpPage > totalPage ||
            jumpPage === currPage ||
            isNaN(jumpPage)
        ) {
            return;
        }
        changePage(jumpPage);
    }, 1000);

    const prevPageHandler = () => {
        if (currPage === 1) {
            return;
        }
        changePage(currPage - 1);
    };

    const nextPageHandler = () => {
        if (currPage === totalPage) {
            return;
        }
        changePage(currPage + 1);
    };

    const changePage = (page: number) => {
        const queryParams = setQueryParams(
            { type: "page", id: page.toString() },
            router.query
        );
        router.push({ query: { ...queryParams } });
    };

    useEffect(() => {
        const pageParam = getParamsByType("page", router.query);
        if (isNaN(parseInt(pageParam))) {
            setCurrPage(1);
        } else {
            setCurrPage(parseInt(pageParam));
        }
    }, [router.query]);

    return (
        <div className={classes["container"]}>
            <button className={classes["btn"]} onClick={prevPageHandler}>
                <svg>
                    <use xlinkHref={"sprite.svg#icon-chevron-thin-left"} />
                </svg>
            </button>
            <input
                type="text"
                className={classes["input"]}
                placeholder={currPage ? currPage.toString() : "1"}
                onChange={jumpPageHandler}
            />
            / {totalPage}
            <button className={classes["btn"]} onClick={nextPageHandler}>
                <svg>
                    <use xlinkHref={"sprite.svg#icon-chevron-thin-right"} />
                </svg>
            </button>
        </div>
    );
};

export default PageSelector;
