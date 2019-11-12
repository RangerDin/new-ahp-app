export const MIN_OBJECTS_COUNT = 2;
export const MAX_OBJECTS_COUNT = 7;
export const MIN_PARAMETERS_COUNT = 1;
export const MAX_PARAMETERS_COUNT = 7;

export const COMPARISON_INDEX = {
    ABSOLUTELY_INFERIOR: 1,
    CLEARLY_LESS_PREFERABLE: 2,
    MUCH_LESS_PREFERABLE: 3,
    SLIGHTLY_LESS_PREFERABLE: 4,
    SAME_DEGREE_OF_PREFERENCE: 5,
    SLIGHTLY_PREFERABLE: 6,
    MUCH_PREFERABLE: 7,
    CLEARLY_PREFERABLE: 8,
    ABSOLUTELY_SUPERIOR: 9,
};

export const COMPARISON_INDEX_TO_VALUE = {
    [COMPARISON_INDEX.ABSOLUTELY_INFERIOR]: 1/9,
    [COMPARISON_INDEX.CLEARLY_LESS_PREFERABLE]: 1/7,
    [COMPARISON_INDEX.MUCH_LESS_PREFERABLE]: 1/5,
    [COMPARISON_INDEX.SLIGHTLY_LESS_PREFERABLE]: 1/3,
    [COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE]: 1.0,
    [COMPARISON_INDEX.SLIGHTLY_PREFERABLE]: 3.0,
    [COMPARISON_INDEX.MUCH_PREFERABLE]: 5.0,
    [COMPARISON_INDEX.CLEARLY_PREFERABLE]: 7.0,
    [COMPARISON_INDEX.ABSOLUTELY_SUPERIOR]: 9.0,
};

export const COMPARISON_INDEX_TO_LABEL = {
    [COMPARISON_INDEX.ABSOLUTELY_INFERIOR]: 'comparisons.absolutely-inferior',
    [COMPARISON_INDEX.CLEARLY_LESS_PREFERABLE]: 'comparisons.clearly-less-preferable',
    [COMPARISON_INDEX.MUCH_LESS_PREFERABLE]: 'comparisons.much-less-preferable',
    [COMPARISON_INDEX.SLIGHTLY_LESS_PREFERABLE]: 'comparisons.slightly-less-preferable',
    [COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE]: 'comparisons.same-degree',
    [COMPARISON_INDEX.SLIGHTLY_PREFERABLE]: 'comparisons.slightly-preferable',
    [COMPARISON_INDEX.MUCH_PREFERABLE]: 'comparisons.much-preferable',
    [COMPARISON_INDEX.CLEARLY_PREFERABLE]: 'comparisons.clearly-preferable',
    [COMPARISON_INDEX.ABSOLUTELY_SUPERIOR]: 'comparisons.absolutely-superior',
};
export const SHORT_COMPARISON_PRECISION = 2;

export const COMPARISON_INDEX_TO_STRING = {
    [COMPARISON_INDEX.ABSOLUTELY_INFERIOR]: '1/9',
    [COMPARISON_INDEX.CLEARLY_LESS_PREFERABLE]: '1/7',
    [COMPARISON_INDEX.MUCH_LESS_PREFERABLE]: '1/5',
    [COMPARISON_INDEX.SLIGHTLY_LESS_PREFERABLE]: '1/3',
    [COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE]: '1',
    [COMPARISON_INDEX.SLIGHTLY_PREFERABLE]: '3',
    [COMPARISON_INDEX.MUCH_PREFERABLE]: '5',
    [COMPARISON_INDEX.CLEARLY_PREFERABLE]: '7',
    [COMPARISON_INDEX.ABSOLUTELY_SUPERIOR]: '9',
};

export const WIDGET_TYPE = {
    LIST: 'LIST',
    MATRIX: 'MATRIX',
};
