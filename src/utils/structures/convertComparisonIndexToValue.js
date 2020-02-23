import {COMPARISON_INDEX_TO_VALUE} from 'constants/comparisons';

const convertComparisonIndexToValue = function(element) {
    if (Array.isArray(element)) {
        return element.map((subElement) => convertComparisonIndexToValue(subElement));
    }

    return COMPARISON_INDEX_TO_VALUE[element];
};

export default convertComparisonIndexToValue;

