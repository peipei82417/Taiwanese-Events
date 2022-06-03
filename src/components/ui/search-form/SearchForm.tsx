import useDebounce from "hooks/useDebounce";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getParamsByType, setQueryParams } from "utils/search-params-util";
import classes from "./SearchForm.module.css";

interface SearchFormProps {
    icon: string;
    placeholder: string;
}

const SearchForm = (props: SearchFormProps) => {
    const router = useRouter();
    const [placeholder, setPlaceholder] = useState("Title Search");

    const onChangeHandler = useDebounce((e) => {
        const queryParam = setQueryParams(
            { type: "searchForm", id: e.target.value },
            router.query
        );
        router.push({
            query: { ...queryParam },
        });
    }, 1000);

    useEffect(() => {
        const currParam = getParamsByType("searchForm", router.query);
        if (!currParam) {
            setPlaceholder("Title Search");
        } else {
            setPlaceholder(currParam);
        }
    }, [router.query]);

    return (
        <div className={classes["search"]}>
            <input
                type="text"
                className={classes["input"]}
                placeholder={placeholder}
                onChange={onChangeHandler}
            />
            {props.icon && (
                <svg className={classes["icon"]}>
                    <use xlinkHref={props.icon} />
                </svg>
            )}
        </div>
    );
};

export default SearchForm;
