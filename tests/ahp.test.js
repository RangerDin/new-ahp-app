import convertToBig from '../src/utils/structures/convertToBig';
import {
    getPriorityVector,
    getPriorityMatrix,
    getNormalizedOverallRankingByPriorities,
    getObjectCoherenceRelations,
} from '../src/utils/math/ahp';

describe('AHP', () => {
    const convertNumberToFixed = (matrix) => {
        if (!Array.isArray(matrix)) {
            return matrix.toFixed(2);
        }

        return matrix.map((subMatrix) => convertNumberToFixed(subMatrix));
    };

    test('Correct result calculation #1', async () => {
        const PRIORITY_COMPARISONS = [[1]];
        const OBJECT_COMPARISONS = [[
            [1, 5, 6, 7],
            [1/4, 1, 4, 6],
            [1/6, 1/4, 1, 4],
            [1/7, 1/6, 1/4, 1],
        ]];
        const OVERALL_RANKING = [0.62, 0.24, 0.1, 0.04];

        const priorityComparisonsAsBig = convertToBig(PRIORITY_COMPARISONS);
        const {promise: priorityVectorPromise} = getPriorityVector(priorityComparisonsAsBig);
        const priorityVector = await priorityVectorPromise;

        const objectComparisonsAsBig = convertToBig(OBJECT_COMPARISONS);
        const {promise: priorityMatrixPromise} = getPriorityMatrix(objectComparisonsAsBig);
        const priorityMatrix = await priorityMatrixPromise;
        const overallRanking = getNormalizedOverallRankingByPriorities(priorityVector, priorityMatrix);

        expect(convertNumberToFixed(overallRanking)).toEqual(convertNumberToFixed(OVERALL_RANKING));

        const coherence = getObjectCoherenceRelations(objectComparisonsAsBig, priorityMatrix);

        expect(convertNumberToFixed(coherence)).toEqual(convertNumberToFixed([0.16]));
    });

    test('Correct result calculation #2 (saati, school example #1)', async () => {
        const PRIORITY_COMPARISONS = [
            [1, 4, 3, 1, 3, 4],
            [1/4, 1, 7, 3, 1/5, 1],
            [1/3, 1/7, 1, 1/5, 1/5, 1/6],
            [1, 1/3, 5, 1, 1, 1/3],
            [1/3, 5, 5, 1, 1, 3],
            [1/4, 1, 6, 3, 1/3, 1],
        ];
        const OBJECT_COMPARISONS = [[
            [1, 1/3, 1/2],
            [3, 1, 3],
            [2, 1/3, 1],
        ], [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
        ], [
            [1, 5, 1],
            [1/5, 1, 1/5],
            [1, 5, 1],
        ], [
            [1, 9, 7],
            [1/9, 1, 1/5],
            [1/7, 5, 1],
        ], [
            [1, 1/2, 1],
            [2, 1, 2],
            [1, 1/2, 1],
        ], [
            [1, 6, 4],
            [1/6, 1, 1/3],
            [1/4, 3, 1],
        ]];
        const OVERALL_RANKING = [0.37, 0.38, 0.25];
        const OBJECT_COHERENCE_RELATIONS = [0.05, 0, 0, 0.18, 0, 0.05];

        const priorityComparisonsAsBig = convertToBig(PRIORITY_COMPARISONS);
        const {promise: priorityVectorPromise} = getPriorityVector(priorityComparisonsAsBig);
        const priorityVector = await priorityVectorPromise;

        const objectComparisonsAsBig = convertToBig(OBJECT_COMPARISONS);
        const {promise: priorityMatrixPromise} = getPriorityMatrix(objectComparisonsAsBig);
        const priorityMatrix = await priorityMatrixPromise;
        const overallRanking = getNormalizedOverallRankingByPriorities(priorityVector, priorityMatrix);

        expect(convertNumberToFixed(overallRanking)).toEqual(convertNumberToFixed(OVERALL_RANKING));

        const coherence = getObjectCoherenceRelations(objectComparisonsAsBig, priorityMatrix);

        expect(convertNumberToFixed(coherence)).toEqual(convertNumberToFixed(OBJECT_COHERENCE_RELATIONS));
    });

    test('Correct result calculation #3 (saati, school example #2)', async () => {
        const PRIORITY_COMPARISONS = [
            [1, 5, 7, 5, 3, 1],
            [1/5, 1, 3, 1/5, 1/6, 1/6],
            [1/7, 1/3, 1, 1/4, 1/5, 1/5],
            [1/5, 5, 4, 1, 1/5, 1/6],
            [1/3, 6, 5, 5, 1, 1],
            [1, 6, 5, 6, 1, 1],
        ];
        const OBJECT_COMPARISONS = [[
            [1, 1/3, 1/2],
            [3, 1, 3],
            [2, 1/3, 1],
        ], [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
        ], [
            [1, 5, 1],
            [1/5, 1, 1/5],
            [1, 5, 1],
        ], [
            [1, 9, 7],
            [1/9, 1, 1/5],
            [1/7, 5, 1],
        ], [
            [1, 1/2, 1],
            [2, 1, 2],
            [1, 1/2, 1],
        ], [
            [1, 6, 4],
            [1/6, 1, 1/3],
            [1/4, 3, 1],
        ]];
        const OVERALL_RANKING = [0.4, 0.36, 0.24];
        const OBJECT_COHERENCE_RELATIONS = [0.05, 0, 0, 0.18, 0, 0.05];

        const priorityComparisonsAsBig = convertToBig(PRIORITY_COMPARISONS);
        const {promise: priorityVectorPromise} = getPriorityVector(priorityComparisonsAsBig);
        const priorityVector = await priorityVectorPromise;

        const objectComparisonsAsBig = convertToBig(OBJECT_COMPARISONS);
        const {promise: priorityMatrixPromise} = getPriorityMatrix(objectComparisonsAsBig);
        const priorityMatrix = await priorityMatrixPromise;
        const overallRanking = getNormalizedOverallRankingByPriorities(priorityVector, priorityMatrix);

        expect(convertNumberToFixed(overallRanking)).toEqual(convertNumberToFixed(OVERALL_RANKING));

        const coherence = getObjectCoherenceRelations(objectComparisonsAsBig, priorityMatrix);

        expect(convertNumberToFixed(coherence)).toEqual(convertNumberToFixed(OBJECT_COHERENCE_RELATIONS));
    });
});
