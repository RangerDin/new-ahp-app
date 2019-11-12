import {COMPARISON_INDEX} from 'constants/comparisons';

export const solution = {
    isSynchronized: true,
    question:
        'The best Italian mid-engine supercar worth less than 10,000 pounds',
    description: 'The solution of the reputable car journalist',
    parameterNames: ['Reliability', 'Speed', 'Technical condition'],
    objectNames: ['Ferrari 308 GT4', 'Maserati Merak', 'Lamborghini Urraco'],
    parameterComparisons: [
        [
            COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE,
            COMPARISON_INDEX.MUCH_PREFERABLE,
            COMPARISON_INDEX.SLIGHTLY_PREFERABLE,
        ],
        [
            COMPARISON_INDEX.MUCH_LESS_PREFERABLE,
            COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE,
            COMPARISON_INDEX.SLIGHTLY_LESS_PREFERABLE,
        ],
        [
            COMPARISON_INDEX.SLIGHTLY_LESS_PREFERABLE,
            COMPARISON_INDEX.SLIGHTLY_PREFERABLE,
            COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE,
        ],
    ],
    objectComparisons: [
        [
            [
                COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE,
                COMPARISON_INDEX.MUCH_PREFERABLE,
                COMPARISON_INDEX.CLEARLY_PREFERABLE,
            ],
            [
                COMPARISON_INDEX.MUCH_LESS_PREFERABLE,
                COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE,
                COMPARISON_INDEX.SLIGHTLY_PREFERABLE,
            ],
            [
                COMPARISON_INDEX.CLEARLY_LESS_PREFERABLE,
                COMPARISON_INDEX.SLIGHTLY_LESS_PREFERABLE,
                COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE,
            ],
        ],
        [
            [
                COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE,
                COMPARISON_INDEX.CLEARLY_PREFERABLE,
                COMPARISON_INDEX.CLEARLY_PREFERABLE,
            ],
            [
                COMPARISON_INDEX.CLEARLY_LESS_PREFERABLE,
                COMPARISON_INDEX.SLIGHTLY_PREFERABLE,
                COMPARISON_INDEX.SLIGHTLY_PREFERABLE,
            ],
            [
                COMPARISON_INDEX.CLEARLY_LESS_PREFERABLE,
                COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE,
                COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE,
            ],
        ],
        [
            [
                COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE,
                COMPARISON_INDEX.CLEARLY_PREFERABLE,
                COMPARISON_INDEX.CLEARLY_PREFERABLE,
            ],
            [
                COMPARISON_INDEX.CLEARLY_LESS_PREFERABLE,
                COMPARISON_INDEX.SLIGHTLY_PREFERABLE,
                COMPARISON_INDEX.SLIGHTLY_PREFERABLE,
            ],
            [
                COMPARISON_INDEX.CLEARLY_LESS_PREFERABLE,
                COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE,
                COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE,
            ],
        ],
    ],
    parameterPriorityVector: null,
    parameterMatrixConsistency: null,
    objectPriorityMatrix: null,
    objectMatrixConsistencies: null,
    overallRanking: null,
};
