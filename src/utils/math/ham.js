import {
    pow,
    divideMatrixToNumber,
    sumOfElements,
    transponse,
    convertToBig,
    multiply,
} from './matrix';

export const MATRIX_POWER = 7;

const getVectorOfRowSums = (matrix) =>
    matrix.map((row) => row.reduce((sum, element) => sum.add(element)));

export const getPriorityVector = (matrix) => {
    const poweredMatrix = pow(matrix, MATRIX_POWER);

    const matrixSum = sumOfElements(poweredMatrix);
    const vectorOfRowSums = getVectorOfRowSums(poweredMatrix);
    return divideMatrixToNumber(vectorOfRowSums, matrixSum);
};

export const getPriorityMatrix = (comparisonMatrixes) => {
    const priorityVectors = comparisonMatrixes.map((comparisonMatrix) =>
        getPriorityVector(comparisonMatrix)
    );

    return transponse(priorityVectors);
};

export const getOverallRanking = (parameterMatrix, objectsMatrixes) => {
    const priorityVector = getPriorityVector(parameterMatrix).map((element) => [
        element,
    ]);
    const priorityMatrix = getPriorityMatrix(objectsMatrixes);

    return multiply(priorityMatrix, priorityVector);
};
