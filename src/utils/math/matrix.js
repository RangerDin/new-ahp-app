export const multiply = function(matrix1, matrix2) {
    const result = [];

    for (let i = 0; i < matrix1.length; i++) {
        result[i] = new Array(matrix1.length)
            .fill()
            .map(() => new Array(matrix2[0].length));

        for (let j = 0; j < matrix2[0].length; j++) {
            result[i][j] = 0;

            for (let k = 0; k < matrix1[0].length; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }

    return result;
};

export const pow = function(matrix, exponent) {
    let resultMatrix = copy(matrix);

    for (let i = 1; i < exponent; i++) {
        resultMatrix = multiply(resultMatrix, resultMatrix);
    }

    return resultMatrix;
};

export const copy = function(matrix) {
    return matrix.map((row) => [...row]);
};
