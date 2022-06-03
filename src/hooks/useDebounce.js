import { useEffect, useRef, useCallback } from "react";

const useDebounce = (fn, delay, dep = []) => {
    const { current } = useRef({ fn, timer: null });
    useEffect(() => {
        current.fn = fn;
    }, [fn]);

    return useCallback((...args) => {
        if (current.timer) {
            clearTimeout(current.timer);
        }
        current.timer = setTimeout(() => {
            current.fn(...args);
        }, delay);
    }, dep);
};

export default useDebounce;
