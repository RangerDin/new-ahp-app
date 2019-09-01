import convertToBig from './convertToBig';
import {COMPARISON_VALUES} from 'constants/comparisons';
import {setElement, deleteElement, pushElement} from './immutableArray';

export default class HAM {
    static addParameterName(
        parameterNames,
        parameterComparisons,
        objectComparisons
    ) {
        return {
            parameterNames: HAM.getNameListWithAddedName(parameterNames),
            parameterComparisons: HAM.getComparisonMatrixWithAddedName(
                parameterComparisons
            ),
            objectComparisons: HAM.getObjectComparisonsWithAddedParameterName(
                objectComparisons
            ),
        };
    };

    static deleteParameterName(
        parameterNames,
        parameterComparisons,
        objectComparisons,
        index
    ) {
        return {
            parameterNames: HAM.getNameListWithDeletedName(parameterNames, index),
            parameterComparisons: HAM.getComparisonMatrixWithDeletedName(
                parameterComparisons,
                index
            ),
            objectComparisons: HAM.getObjectComparisonsWithDeletedParameterName(
                objectComparisons,
                index
            ),
        };
    };

    static addObjectName(objectNames, objectComparisons) {
        return {
            objectNames: HAM.getNameListWithAddedName(objectNames),
            objectComparisons: objectComparisons.map(HAM.getComparisonMatrixWithAddedName),
        };
    };

    static deleteObjectName(objectNames, objectComparisons, index) {
        return {
            objectNames: HAM.getNameListWithDeletedName(objectNames, index),
            objectComparisons: objectComparisons.map((comparisons) =>
                HAM.getComparisonMatrixWithDeletedName(comparisons, index)
            ),
        };
    };

    static setParameterComparison(
        parameterComparisons,
        index1,
        index2,
        value
    ) {
        return {
            parameterComparisons: HAM.setElementInComparisonMatrix(
                parameterComparisons,
                index1,
                index2,
                convertToBig(value)
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
                HAM.setElementInComparisonMatrix(
                    objectComparisons[parameterIndex],
                    objectIndex1,
                    objectIndex2,
                    convertToBig(value)
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
                pushElement(
                    row,
                    convertToBig(COMPARISON_VALUES.SAME_DEGREE_OF_PREFERENCE)
                )
            ),
            convertToBig(
                new Array(newRowLength).fill(
                    COMPARISON_VALUES.SAME_DEGREE_OF_PREFERENCE
                )
            )
        );
    };

    static getObjectComparisonsWithAddedParameterName(comparisons) {
        const nRows = comparisons[0].length;
        const nColumns = comparisons[0][0].length;

        return [
            ...comparisons,
            convertToBig(
                HAM.create2dArray(
                    nRows,
                    nColumns,
                    COMPARISON_VALUES.SAME_DEGREE_OF_PREFERENCE
                )
            ),
        ];
    };

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
        const [min, max] = index1 < index2 ? [index1, index2] : [index2, index1];
        const reverseValue = convertToBig(1).div(value);

        return [
            ...comparisonMatrix.slice(0, min),
            setElement(comparisonMatrix[min], max, value),
            ...comparisonMatrix.slice(min + 1, max),
            setElement(comparisonMatrix[max], min, reverseValue),
            ...comparisonMatrix.slice(max + 1),
        ];
    };

    static convertStateToInnerFormat(parameterComparisons, objectComparisons) {
        return {
            parameterComparisons: convertToBig(parameterComparisons),
            objectComparisons: convertToBig(objectComparisons),
        };
    };

    static setName(nameListProperty, list, index, newName) {
        return {
            [nameListProperty]: setElement(
                list,
                index,
                newName
            ),
        };
    };
}
