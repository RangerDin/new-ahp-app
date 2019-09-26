import Big from 'big.js';

export const createEmptyMatrix = function(rows, columns) {
    return new Array(rows).fill().map(() => new Array(columns).fill());
};

export const multiply = function(matrix1, matrix2) {
    const [row1, column1] = size(matrix1);
    const [, column2] = size(matrix2);
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

const asyncMultiply = (matrix1, matrix2) =>
    new Promise((resolve) => {
        const timeoutId = setTimeout(() => {
            const product = multiply(matrix1, matrix2);

            resolve([product, timeoutId]);
        }, 0);
    });

export const pow = function(matrix, exponent) {
    const timeoutIds = [];
    let resultPromise = Promise.resolve([matrix, null]);

    for (let i = 1; i < exponent;) {
        const doubledPow = i * 2;

        resultPromise = resultPromise.then(([resultMatrix, timeoutId]) => {
            if (timeoutId) {
                timeoutIds.push(timeoutId);
            }

            const secondMultiplier = doubledPow < exponent ? resultMatrix : matrix;

            return asyncMultiply(resultMatrix, secondMultiplier);
        });
        i = doubledPow < exponent ? doubledPow : i + 1;
    }

    return resultPromise.then(([resultMatrix, timeoutId]) => {
        timeoutIds.push(timeoutId);

        return [resultMatrix, timeoutIds];
    });
};

export const copy = function(matrix) {
    return matrix.map((row) => [...row]);
};

export const sumOfElements = function(matrix) {
    return matrix.reduce(
        (sum, row) =>
            sum.add(row.reduce((sumOfRow, element) => sumOfRow.add(element))),
        new Big(0)
    );
};

export const size = function(matrix) {
    return [matrix.length, matrix[0].length];
};

export const divideMatrixToNumber = function(vector, num) {
    return vector.map((element) => element.div(num));
};

export const dotDivide = function(matrix1, matrix2) {
    return matrix1.map((row, i) =>
        row.map((_, j) => matrix1[i][j].div(matrix2[i][j]))
    );
};

export const transponse = function(matrix) {
    const [rowCount, columnCount] = size(matrix);
    const transposedMatrix = createEmptyMatrix(columnCount, rowCount);

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < columnCount; j++) {
            transposedMatrix[j][i] = matrix[i][j];
        }
    }

    return transposedMatrix;
};

export const mean = function(vector) {
    return sumOfElements(vector) / vector.length;
};

export const vectorToMatrix = function(vector) {
    return vector.map((element) => [element]);
};
