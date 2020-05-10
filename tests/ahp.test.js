import convertToBig from '../src/utils/structures/convertToBig';
import {
    getPriorityVector,
    getPriorityMatrix,
    getNormalizedOverallRankingByPriorities,
    getObjectCoherenceRelations,
} from '../src/utils/math/newAhp';

describe('AHP', () => {
    const PRIORITY_COMPARISONS = [[1]];
    const OBJECT_COMPARISONS = [[
        [1, 5, 6, 7],
        [1/4, 1, 4, 6],
        [1/6, 1/4, 1, 4],
        [1/7, 1/6, 1/4, 1],
    ]];
    const convertNumberToFixed = (matrix) => {
        if (!Array.isArray(matrix)) {
            return matrix.toFixed(2);
        }

        return matrix.map((subMatrix) => convertNumberToFixed(subMatrix));
    };

    test('Correct result calculation', async () => {
        const priorityComparisonsAsBig = convertToBig(PRIORITY_COMPARISONS);
        const {promise: priorityVectorPromise} = getPriorityVector(priorityComparisonsAsBig);
        const priorityVector = await priorityVectorPromise;

        const objectComparisonsAsBig = convertToBig(OBJECT_COMPARISONS);
        const {promise: priorityMatrixPromise} = getPriorityMatrix(objectComparisonsAsBig);
        const priorityMatrix = await priorityMatrixPromise;
        const overallRanking = getNormalizedOverallRankingByPriorities(priorityVector, priorityMatrix);

        expect(convertNumberToFixed(overallRanking)).toEqual(convertNumberToFixed([0.62, 0.24, 0.1, 0.04]));

        const coherence = getObjectCoherenceRelations(objectComparisonsAsBig, priorityMatrix);

        expect(convertNumberToFixed(coherence)).toEqual(convertNumberToFixed([0.16]));
    });
});
