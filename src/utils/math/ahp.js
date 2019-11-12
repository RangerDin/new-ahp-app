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
import {COMPARISON_RESULT_PRECISION} from 'constants/comparisons';

export const MATRIX_POWER = 50;

const getVectorOfRowSums = (matrix) =>
    matrix.map((row) => row.reduce((sum, element) => sum.add(element)));

export const getPriorityVector = (matrix) => {
    return pow(matrix, MATRIX_POWER).then(([poweredMatrix, timeoutIds]) => {
        const vectorOfRowSums = getVectorOfRowSums(poweredMatrix);
        const matrixSum = sumOfElements(poweredMatrix);
        const priorityVector = divideMatrixToNumber(vectorOfRowSums, matrixSum);

        return [priorityVector, timeoutIds];
    });
};

export const getPriorityMatrix = (comparisonMatrixes) => {
    return Promise.all(
        comparisonMatrixes.map((comparisonMatrix) =>
            getPriorityVector(comparisonMatrix)
        )
    ).then((priorityAndTimeoutVectors) => {
        const priorityVectors = priorityAndTimeoutVectors.map(
            ([priorityVector]) => priorityVector
        );
        const allTimeoutIds = priorityAndTimeoutVectors.reduce(
            (allIds, [_, timeoutIds]) => [...timeoutIds, ...allIds],
            []
        );

        const transponsedPriorityVectors = transponse(priorityVectors);

        return [transponsedPriorityVectors, allTimeoutIds];
    });
};

export const getOverallRankingByPriorities = (
    parameterPriorityVector,
    objectPriorityMatrix
) => {
    const priorityVectorAsMatrix = vectorToMatrix(parameterPriorityVector);

    return multiply(objectPriorityMatrix, priorityVectorAsMatrix);
};

export const getNormalizedOverallRankingByPriorities = (
    parameterPriorityVector,
    objectPriorityMatrix
) => {
    const overallRanking = getOverallRankingByPriorities(
        parameterPriorityVector,
        objectPriorityMatrix
    );
    const overallRankingWithFixedPrecision = overallRanking.map((rank) =>
        Number(rank[0].toFixed(COMPARISON_RESULT_PRECISION))
    );
    const allElementsButLast = overallRankingWithFixedPrecision.slice(0, -1);
    const sumOfAllButLast = allElementsButLast.reduce((sum, rank) => sum + rank);
    const lastElement = Number((1 - sumOfAllButLast).toFixed(COMPARISON_RESULT_PRECISION));
    const normalizedOverallRanking = [
        ...allElementsButLast,
        lastElement,
    ];

    return normalizedOverallRanking;
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

export const getCoherenceRelation = (comparisonMatrix, priorityVector) => {
    const rank = priorityVector.length;
    const priorityMatrix = vectorToMatrix(priorityVector);

    if (rank < 1 || !(rank in RANDOM_COHERENCE_INDEXES)) {
        return null;
    }
    if ([1, 2].indexOf(rank) != -1) {
        return 0;
    }

    const principalEigenvalue = mean(
        dotDivide(multiply(comparisonMatrix, priorityMatrix), priorityMatrix)
    );

    return (
        (principalEigenvalue - rank) /
        (rank - 1) /
        getRandomCoherenceIndex(rank)
    );
};

export const getObjectCoherenceRelations = (
    comparisonMatrixes,
    priorityMatrix
) => {
    const objectCoherenceRelations = [];
    const nMatrixes = comparisonMatrixes.length;

    for (let i = 0; i < nMatrixes; i++) {
        objectCoherenceRelations[i] = getCoherenceRelation(
            comparisonMatrixes[i],
            priorityMatrix.map((row) => row[i])
        );
    }

    return objectCoherenceRelations;
};
