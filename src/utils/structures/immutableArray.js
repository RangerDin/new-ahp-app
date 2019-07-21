export const setElement = (array, index, element) => {
    return [
        ...array.slice(0, index),
        element,
        ...array.slice(index + 1),
    ];
};

export const deleteElement = (array, index) => {
    return [
        ...array.slice(0, index),
        ...array.slice(index + 1),
    ];
};

export const pushElement = (array, element) => {
    return [
        ...array,
        element,
    ];
};
