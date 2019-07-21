import Big from 'big.js';

const convertToBig = function(element) {
    if (
        ['number', 'string'].includes(typeof element) ||
        element instanceof Big
    ) {
        return new Big(element);
    }

    return element.map((subElement) => convertToBig(subElement));
};

export default convertToBig;
