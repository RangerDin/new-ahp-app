
import {COMPARISON_RESULT_PRECISION, RANDOM_COHERENCE_INDEXES} from 'constants/comparisons';
import {
    getVectorOfRowSums,
    sumOfAllElements,
    asyncPow,
    divideVectorToNumber,
    multiply,
    meanOfAllElements,
    dotDivide,
} from './bigMatrix';
import {createMatrixFromVector, transponse} from './matrix';

export const MATRIX_POWER = 50;

export const getPriorityVector = (matrix) => {
    let cancelled = false;
    const {promise, cancel} = asyncPow(matrix, MATRIX_POWER);

    const newCancel = () => {
        cancel();
        cancelled = true;
    };

    const newPromise = promise.then((poweredMatrix) => {
        if (cancelled) {
            throw new Error('Cancelled');
        };

        const vectorOfRowSums = getVectorOfRowSums(poweredMatrix);
        const sumOfElements = sumOfAllElements(poweredMatrix);
        const priorityVector = divideVectorToNumber(vectorOfRowSums, sumOfElements);

        return priorityVector;
    });

    return {
        promise: newPromise,
        cancel: newCancel,
    };
};

export const getPriorityMatrix = (comparisonMatrixes) => {
    const promises = [];
    const cancels = [];
    let cancelled = false;

    comparisonMatrixes.map(getPriorityVector).forEach(({promise, cancel}) => {
        promises.push(promise);
        cancels.push(cancel);
    });

    const newPromise = Promise.all(
        promises
    ).then((priorityVectors) => {
        if (cancelled) {
            throw new Error('Cancelled');
        }

        const transponsedPriorityVectors = transponse(priorityVectors);

        return transponsedPriorityVectors;
    });

    const newCancel = () => {
        cancelled = true;

        cancels.forEach((cancel) => cancel());
    };

    return {
        promise: newPromise,
        cancel: newCancel,
    };
};

export const getOverallRankingByPriorities = (
    parameterPriorityVector,
    objectPriorityMatrix
) => {
    const priorityVectorAsMatrix = createMatrixFromVector(parameterPriorityVector);

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


export const getRandomCoherenceIndex = (rank) => {
    if (rank in RANDOM_COHERENCE_INDEXES) {
        return RANDOM_COHERENCE_INDEXES[rank];
    }

    return null;
};

export const getCoherenceRelation = (comparisonMatrix, priorityVector) => {
    const rank = priorityVector.length;
    const priorityMatrix = createMatrixFromVector(priorityVector);

    if (rank < 1 || !(rank in RANDOM_COHERENCE_INDEXES)) {
        return null;
    }
    if ([1, 2].indexOf(rank) != -1) {
        return 0;
    }

    const principalEigenvalue = meanOfAllElements(
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
