export const createAsyncFunction = (action, timeout = 0) => (...args) => {
    let cancelled = false;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (cancelled) {
                reject(new Error('Cancelled 1'));
            }

            const result = action(...args);

            resolve(result);
        }, timeout);
    });

    const cancel = () => {
        cancelled = true;
    };

    return {
        promise,
        cancel,
    };
};
