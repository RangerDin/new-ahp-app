import {
    pow,
    divideMatrixToNumber,
    sumOfElements,
    transponse,
    multiply,
    dotDivide,
    mean,
    vectorToMatrix,
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
    const priorityVector = vectorToMatrix(getPriorityVector(parameterMatrix));
    const priorityMatrix = getPriorityMatrix(objectsMatrixes);

    return multiply(priorityMatrix, priorityVector);
};

const RANDOM_COHERENCE_INDEXES = {
    1: 0.0,
    2: 0.0,
    3: 0.58,
    4: 0.9,
    5: 1.12,
    6: 1.24,
    7: 1.32,
    8: 1.41,
    9: 1.45,
    10: 1.49,
    11: 1.51,
    12: 1.48,
    13: 1.56,
    14: 1.57,
    15: 1.59,
};

export const getRandomCoherenceIndex = (rank) => {
    if (rank in RANDOM_COHERENCE_INDEXES) {
        return RANDOM_COHERENCE_INDEXES[rank];
    }

    return null;
};

export const getCoherenceRelation = (
    comparisonMatrix,
    priorityVector = getPriorityVector(comparisonMatrix)
) => {
    const rank = priorityVector.length;
    const priorityMatrix = vectorToMatrix(priorityVector);

    if (rank < 1 || !(rank in RANDOM_COHERENCE_INDEXES)) {
        return null;
    }
    if ([1, 2].indexOf(rank) != -1) {
        return 0;
    }

    const principalEigenvalue = mean(
        dotDivide(
            multiply(comparisonMatrix, priorityMatrix),
            priorityMatrix
        )
    );

    return (
        (principalEigenvalue - rank) /
        (rank - 1) /
        getRandomCoherenceIndex(rank)
    );
};
