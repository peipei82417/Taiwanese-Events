import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getParamsByType, setQueryParams } from "utils/search-params-util";
import classes from "./SortingSelector.module.css";
import SortingSelectorItem from "./SortingSelectorItem";

interface SortingSelectorProps {
    totalDataSize: number;
}

const SortingSelector = (props: SortingSelectorProps) => {
    const router = useRouter();

    const [sorting, setSorting] = useState<
        ["default" | "hitRate" | "startDate" | "endDate", "1" | "-1"]
    >(["default", "1"]);

    const onClickHandler = (e) => {
        const params: string[] = [e.target.id];
        if (sorting[0] === e.target.id) {
            const val = parseInt(sorting[1]) * -1 === -1 ? "-1" : "1";
            params.push(val);
        } else {
            params.push(sorting[1]);
        }

        const queryParam = setQueryParams(
            { type: "sorting", id: params },
            router.query
        );
        router.push({ query: { ...queryParam } });
    };

    useEffect(() => {
        const sortingParam = getParamsByType("sorting", router.query);
        if (sortingParam) {
            setSorting(sortingParam);
        }
    }, [router.query]);

    return (
        <div className={classes["container"]}>
            <div className={classes["data-count"]}>
                共 {props.totalDataSize} 筆資料
            </div>
            <div className={classes["sorting-bar"]}>
                <SortingSelectorItem
                    id={"hitRate"}
                    name={"點閱率"}
                    currSorting={sorting}
                    onClickHandler={onClickHandler}
                />
                <SortingSelectorItem
                    id={"startDate"}
                    name={"開始時間"}
                    currSorting={sorting}
                    onClickHandler={onClickHandler}
                />
                <SortingSelectorItem
                    id={"endDate"}
                    name={"結束時間"}
                    currSorting={sorting}
                    onClickHandler={onClickHandler}
                />
            </div>
        </div>
    );
};

export default SortingSelector;
