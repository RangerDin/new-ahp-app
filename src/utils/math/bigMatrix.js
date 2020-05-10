import Big from 'big.js';
import {createEmptyMatrix, getMatrixSize} from './matrix';
import {createAsyncFunction} from 'utils/async';

export const multiply = (matrix1, matrix2) => {
    const [row1, column1] = getMatrixSize(matrix1);
    const [, column2] = getMatrixSize(matrix2);
    const result = createEmptyMatrix(row1, column2);

    for (let i = 0; i < row1; i++) {
        for (let j = 0; j < column2; j++) {
            result[i][j] = new Big(0);

            for (let k = 0; k < column1; k++) {
                result[i][j] = result[i][j].add(
                    matrix1[i][k].mul(matrix2[k][j])
                );
            }
        }
    }

    return result;
};

const asyncMultiply = createAsyncFunction(multiply);

export const asyncPow = (matrix, exponent) => {
    let cancelled = false;
    let lastCancel = null;

    let resultPromise = Promise.resolve(matrix);

    for (let i = 1; i < exponent;) {
        const doubledPow = i * 2;

        resultPromise = resultPromise.then((resultMatrix) => {
            if (cancelled) {
                throw new Error('Cancelled');
            }

            const secondMultiplier = doubledPow < exponent ? resultMatrix : matrix;
            const {promise, cancel} = asyncMultiply(resultMatrix, secondMultiplier);

            lastCancel = cancel;

            return promise;
        });

        i = doubledPow < exponent ? doubledPow : i + 1;
    }

    const cancel = () => {
        cancelled = true;

        if (lastCancel) {
            lastCancel();
        }
    };

    return {
        promise: resultPromise,
        cancel,
    };
};

export const sumOfAllElements = (matrix) => (
    matrix.reduce(
        (sum, row) =>
            sum.add(row.reduce((sumOfRow, element) => sumOfRow.add(element))),
        new Big(0)
    )
);

export const divideVectorToNumber = (vector, num) => (
    vector.map((element) => element.div(num))
);

export const dotDivide = (matrix1, matrix2) => (
    matrix1.map((row, i) =>
        row.map((_, j) => matrix1[i][j].div(matrix2[i][j]))
    )
);

export const meanOfAllElements = (matrix) => (
    sumOfAllElements(matrix).div(matrix.length)
);

export const getVectorOfRowSums = (matrix) =>
    matrix.map((row) => row.reduce((sum, element) => sum.add(element)));
