import {COMPARISON_INDEX} from 'constants/comparisons';
import {setElement, deleteElement, pushElement} from './immutableArray';

export default class AHP {
    static addParameterName(
        parameterNames,
        parameterComparisons,
        objectComparisons
    ) {
        return {
            parameterNames: AHP.getNameListWithAddedName(parameterNames),
            parameterComparisons: AHP.getComparisonMatrixWithAddedName(
                parameterComparisons
            ),
            objectComparisons: AHP.getObjectComparisonsWithAddedParameterName(
                objectComparisons
            ),
        };
    }

    static deleteParameterName(
        parameterNames,
        parameterComparisons,
        objectComparisons,
        index
    ) {
        return {
            parameterNames: AHP.getNameListWithDeletedName(
                parameterNames,
                index
            ),
            parameterComparisons: AHP.getComparisonMatrixWithDeletedName(
                parameterComparisons,
                index
            ),
            objectComparisons: AHP.getObjectComparisonsWithDeletedParameterName(
                objectComparisons,
                index
            ),
        };
    }

    static addObjectName(objectNames, objectComparisons) {
        return {
            objectNames: AHP.getNameListWithAddedName(objectNames),
            objectComparisons: objectComparisons.map(
                AHP.getComparisonMatrixWithAddedName
            ),
        };
    }

    static deleteObjectName(objectNames, objectComparisons, index) {
        return {
            objectNames: AHP.getNameListWithDeletedName(objectNames, index),
            objectComparisons: objectComparisons.map((comparisons) =>
                AHP.getComparisonMatrixWithDeletedName(comparisons, index)
            ),
        };
    }

    static setParameterComparison(parameterComparisons, index1, index2, value) {
        return {
            parameterComparisons: AHP.setElementInComparisonMatrix(
                parameterComparisons,
                index1,
                index2,
                value
            ),
        };
    }

    static setObjectComparison(
        objectComparisons,
        parameterIndex,
        objectIndex1,
        objectIndex2,
        value
    ) {
        return {
            objectComparisons: setElement(
                objectComparisons,
                parameterIndex,
                AHP.setElementInComparisonMatrix(
                    objectComparisons[parameterIndex],
                    objectIndex1,
                    objectIndex2,
                    value
                )
            ),
        };
    }

    static getNameListWithAddedName(list) {
        return pushElement(list, '');
    }

    static getComparisonMatrixWithAddedName(comparisons) {
        const newRowLength = comparisons[0].length + 1;

        return pushElement(
            comparisons.map((row) =>
                pushElement(row, COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE)
            ),
            new Array(newRowLength).fill(
                COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE
            )
        );
    }

    static getObjectComparisonsWithAddedParameterName(comparisons) {
        const nRows = comparisons[0].length;
        const nColumns = comparisons[0][0].length;

        return [
            ...comparisons,
            AHP.create2dArray(
                nRows,
                nColumns,
                COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE
            ),
        ];
    }

    static create2dArray(nRows, nColumns, elementToFill) {
        return new Array(nRows)
            .fill()
            .map(() => new Array(nColumns).fill().map(() => elementToFill));
    }

    static getNameListWithDeletedName(list, index) {
        return deleteElement(list, index);
    }

    static getComparisonMatrixWithDeletedName(comparisons, index) {
        return deleteElement(comparisons, index).map((row) =>
            deleteElement(row, index)
        );
    }

    static getReversedValue(comparisonValue) {
        return COMPARISON_INDEX.ABSOLUTELY_SUPERIOR - comparisonValue + 1;
    };

    static getObjectComparisonsWithDeletedParameterName(
        objectComparisons,
        parameterIndex
    ) {
        return deleteElement(objectComparisons, parameterIndex);
    }

    static setElementInComparisonMatrix(
        comparisonMatrix,
        index1,
        index2,
        value
    ) {
        const [minIndex, maxIndex] =
            index1 < index2 ? [index1, index2] : [index2, index1];
        const reverseValue = AHP.getReversedValue(value);
        const [minIndexValue, maxIndexValue] =
            index1 < index2 ? [value, reverseValue] : [reverseValue, value];

        return [
            ...comparisonMatrix.slice(0, minIndex),
            setElement(comparisonMatrix[minIndex], maxIndex, minIndexValue),
            ...comparisonMatrix.slice(minIndex + 1, maxIndex),
            setElement(comparisonMatrix[maxIndex], minIndex, maxIndexValue),
            ...comparisonMatrix.slice(maxIndex + 1),
        ];
    }

    static setName(nameListProperty, list, index, newName) {
        return {
            [nameListProperty]: setElement(list, index, newName),
        };
    }
}
