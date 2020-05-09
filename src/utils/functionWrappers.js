export const debounce = (fn, timeout) => {
    let timeoutId = null;

    const wrappedFn = (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }

        timeoutId = setTimeout(fn, timeout, ...args);
    };

    return wrappedFn;
};
