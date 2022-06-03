import { useEffect, useRef, useCallback } from "react";

const useThrottle = (fn, delay, dep = []) => {
    const { current } = useRef({ fn, timer: null });
    useEffect(() => {
        current.fn = fn;
    }, [fn]);

    return useCallback((...args) => {
        if (!current.timer) {
            current.timer = setTimeout(() => {
                delete current.timer;
            }, delay);
            current.fn(...args);
        }
    }, dep);
};

export default useThrottle;
