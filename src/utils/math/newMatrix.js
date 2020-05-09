export const createEmptyMatrix = (rows, columns) => (
    new Array(rows).fill().map(() => new Array(columns).fill())
);

export const getMatrixSize = (matrix) => (
    [matrix.length, matrix[0].length]
);

export const copy = (matrix) => (
    matrix.map((row) => [...row])
);

export const transponse = (matrix) => {
    const [rowCount, columnCount] = getMatrixSize(matrix);
    const transposedMatrix = createEmptyMatrix(columnCount, rowCount);

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < columnCount; j++) {
            transposedMatrix[j][i] = matrix[i][j];
        }
    }

    return transposedMatrix;
};

export const createMatrixFromVector = (vector) => (
    vector.map((element) => [element])
);
