import {useState} from 'preact/hooks';

import {COMPARISON_VALUES} from 'constants/comparisons';
import {size, convertToBig} from './math/matrix';

const defaultState = {
    isSynchronized: false,
    question: '',
    description: '',
    parameterNames: [''],
    objectNames: ['', ''],
    parameterComparisons: [[COMPARISON_VALUES.SAME_DEGREE_OF_PREFERENCE]],
    objectComparisons: [
        [
            [
                COMPARISON_VALUES.SAME_DEGREE_OF_PREFERENCE,
                COMPARISON_VALUES.SAME_DEGREE_OF_PREFERENCE,
            ],
            [
                COMPARISON_VALUES.SAME_DEGREE_OF_PREFERENCE,
                COMPARISON_VALUES.SAME_DEGREE_OF_PREFERENCE,
            ],
        ],
    ],
};

const getNameListWithAddedName = (list) => [...list, ''];

const getNameListWithChangedName = (list, index, newName) => [
    ...list.slice(0, index),
    newName,
    ...list.slice(index + 1),
];

const getNameListWithDeletedName = (list, index) => [
    ...list.slice(0, index),
    ...list.slice(index + 1),
];

const getComparisonMatrixWithAddedName = (comparisons) => {
    const newRowLength = comparisons[0].length + 1;

    return [
        ...comparisons.map((row) => [
            ...row,
            convertToBig(COMPARISON_VALUES.SAME_DEGREE_OF_PREFERENCE),
        ]),
        convertToBig(
            new Array(newRowLength).fill(
                COMPARISON_VALUES.SAME_DEGREE_OF_PREFERENCE
            )
        ),
    ];
};

const getComparisonMatrixWithDeletedName = (comparisons, index) => {
    return comparisons
        .filter((_, rowIndex) => rowIndex !== index)
        .map((row) => row.filter((_, columnIndex) => columnIndex !== index));
};

const getObjectComparisonsWithAddedParameterName = (comparisons) => {
    const [nRows, nColumns] = size(comparisons[0]);

    return [
        ...comparisons,
        convertToBig(
            new Array(nRows)
                .fill()
                .map(() =>
                    new Array(nColumns)
                        .fill()
                        .map(() => COMPARISON_VALUES.SAME_DEGREE_OF_PREFERENCE)
                )
        ),
    ];
};

const getObjectComparisonsWithDeletedParameterName = (
    objectComparisons,
    parameterIndex
) => {
    return objectComparisons.filter((_, index) => index !== parameterIndex);
};

const setElementInComparisonMatrix = (
    comparisonMatrix,
    index1,
    index2,
    value
) => {
    const [min, max] = index1 < index2 ? [index1, index2] : [index2, index1];

    return [
        ...comparisonMatrix.slice(0, min),
        [
            ...comparisonMatrix[min].slice(0, max),
            value,
            ...comparisonMatrix[min].slice(max + 1),
        ],
        ...comparisonMatrix.slice(min + 1, max),
        [
            ...comparisonMatrix[max].slice(0, min),
            convertToBig(1).div(value),
            ...comparisonMatrix[max].slice(min + 1),
        ],
        ...comparisonMatrix.slice(max + 1),
    ];
};

const convertStateToInnerFormat = (state) => ({
    ...state,
    parameterComparisons: convertToBig(state.parameterComparisons),
    objectComparisons: convertToBig(state.objectComparisons),
});

export const useSolution = (initialState = defaultState) => {
    const [state, setState] = useState(convertStateToInnerFormat(initialState));

    const setName = (nameListProperty) => (index, newName) => {
        setState({
            ...state,
            [nameListProperty]: getNameListWithChangedName(
                state[nameListProperty],
                index,
                newName
            ),
            isSynchronized: false,
        });
    };

    const setQuestion = (value) => {
        setState({
            ...state,
            question: value,
        });
    };

    const setDescription = (value) => {
        setState({
            ...state,
            description: value,
        });
    };

    const addParameterName = () => {
        setState({
            ...state,
            parameterNames: getNameListWithAddedName(state.parameterNames),
            parameterComparisons: getComparisonMatrixWithAddedName(
                state.parameterComparisons
            ),
            objectComparisons: getObjectComparisonsWithAddedParameterName(
                state.objectComparisons
            ),
            isSynchronized: false,
        });
    };

    const deleteParameterName = (index) => {
        setState({
            ...state,
            parameterNames: getNameListWithDeletedName(
                state.parameterNames,
                index
            ),
            parameterComparisons: getComparisonMatrixWithDeletedName(
                state.parameterComparisons,
                index
            ),
            objectComparisons: getObjectComparisonsWithDeletedParameterName(
                state.objectComparisons,
                index
            ),
            isSynchronized: false,
        });
    };

    const addObjectName = () => {
        setState({
            ...state,
            objectNames: getNameListWithAddedName(state.objectNames),
            objectComparisons: state.objectComparisons.map((comparisons) =>
                getComparisonMatrixWithAddedName(comparisons)
            ),
            isSynchronized: false,
        });
    };

    const deleteObjectName = (index) => {
        setState({
            ...state,
            objectNames: getNameListWithDeletedName(state.objectNames, index),
            objectComparisons: state.objectComparisons.map((comparisons) =>
                getComparisonMatrixWithDeletedName(comparisons, index)
            ),
            isSynchronized: false,
        });
    };

    const setParameterComparison = (index1, index2, value) => {
        setState({
            ...state,
            parameterComparisons: setElementInComparisonMatrix(
                state.parameterComparisons,
                index1,
                index2,
                convertToBig(value)
            ),
            isSynchronized: false,
        });
    };

    const setObjectComparison = (
        parameterIndex,
        objectIndex1,
        objectIndex2,
        value
    ) => {
        setState({
            ...state,
            objectComparisons: [
                ...state.objectComparisons.slice(0, parameterIndex),
                setElementInComparisonMatrix(
                    state.objectComparisons[parameterIndex],
                    objectIndex1,
                    objectIndex2,
                    convertToBig(value)
                ),
                ...state.objectComparisons.slice(parameterIndex + 1),
            ],
            isSynchronized: false,
        });
    };

    const setSynchronized = () => {
        setState({
            ...state,
            isSynchronized: true,
        });
    };

    const setSolutionState = (newState) => {
        setState(convertStateToInnerFormat(newState));
    };

    const resetSolutionState = () => {
        setSolutionState(defaultState);
    };

    return {
        state,
        operations: {
            setQuestion,
            setDescription,
            addParameterName,
            deleteParameterName,
            changeObjectName: setName('objectNames'),
            changeParameterName: setName('parameterNames'),
            addObjectName,
            deleteObjectName,
            setParameterComparison,
            setObjectComparison,
            setSynchronized,
            setSolutionState,
            resetSolutionState,
        },
    };
};
