import {useState, useEffect, useMemo, useCallback} from 'preact/hooks';

import {COMPARISON_INDEX} from 'constants/comparisons';
import AHP from 'utils/structures/ahp';

import {
    getPriorityMatrix,
    getPriorityVector,
    getCoherenceRelation,
    getObjectCoherenceRelations,
    getNormalizedOverallRankingByPriorities,
} from './math/newAhp';
import {useRef} from 'react';
import convertToBig from './structures/convertToBig';
import convertComparisonIndexToValue from './structures/convertComparisonIndexToValue';
import {debounce} from './functionWrappers';

const arrayNameToMap = (names) =>
    names.reduce((map, name) => {
        map[name] = name in map ? map[name] + 1 : 1;

        return map;
    }, {});

const getAreNameDuplicatedFunctions = (names) => {
    const namesMap = useMemo(() => arrayNameToMap(names), [names]);
    const isNameDuplicated = useCallback((name) => namesMap[name] > 1, [
        namesMap,
    ]);
    const areNamesDuplicated = useMemo(() => names.some(isNameDuplicated), [
        namesMap,
    ]);

    return {
        isNameDuplicated,
        areNamesDuplicated,
    };
};

const defaultState = {
    isSynchronized: true,
    question: '',
    description: '',
    parameterNames: [''],
    objectNames: ['', ''],
    parameterComparisons: [[COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE]],
    objectComparisons: [
        [
            [
                COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE,
                COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE,
            ],
            [
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

const convertStateToInnerFormat = (state) => ({
    ...state,
    parameterPriorityVector: null,
    parameterMatrixConsistency: null,
    objectPriorityMatrix: null,
    objectMatrixConsistencies: null,
    overallRanking: null,
});

const getErrors = (state) => {
    const areObjectNamesFilled = useMemo(
        () => state.objectNames.every(Boolean),
        [state.objectNames]
    );
    const areParameterNamesFilled = useMemo(
        () => state.parameterNames.every(Boolean),
        [state.parameterNames]
    );
    const {
        isNameDuplicated: isObjectNameDuplicated,
        areNamesDuplicated: areObjectNamesDuplicated,
    } = getAreNameDuplicatedFunctions(state.objectNames);
    const {
        isNameDuplicated: isParameterNameDuplicated,
        areNamesDuplicated: areParameterNamesDuplicated,
    } = getAreNameDuplicatedFunctions(state.parameterNames);
    const hasParameterNamesError = useMemo(
        () => !areParameterNamesFilled || areParameterNamesDuplicated,
        [areParameterNamesFilled, areParameterNamesDuplicated]
    );
    const hasObjectNamesError = useMemo(
        () => !areObjectNamesFilled || areObjectNamesDuplicated,
        [areObjectNamesFilled, areObjectNamesDuplicated]
    );
    const hasNamesError = useMemo(
        () => hasParameterNamesError || hasObjectNamesError,
        [hasParameterNamesError, hasObjectNamesError]
    );
    const hasAllFieldsError = useMemo(
        () => !state.question || !state.description || hasNamesError,
        [state.question, state.description, hasNamesError]
    );

    return {
        parameterComparisons: hasParameterNamesError,
        objectComparisons: hasObjectNamesError,
        result: hasNamesError,
        consistency: hasNamesError,
        save: hasAllFieldsError,
        isObjectNameDuplicated: isObjectNameDuplicated,
        isParameterNameDuplicated: isParameterNameDuplicated,
    };
};

const getOperations = (state, setState) => {
    const setName = useCallback(
        (nameListProperty) => (index, newName) => {
            setState({
                ...state,
                ...AHP.setName(
                    nameListProperty,
                    state[nameListProperty],
                    index,
                    newName
                ),
                isSynchronized: false,
            });
        },
        [state, setState]
    );
    const setQuestion = useCallback(
        (value) => {
            setState({
                ...state,
                question: value,
                isSynchronized: false,
            });
        },
        [state, setState]
    );
    const setDescription = useCallback(
        (value) => {
            setState({
                ...state,
                description: value,
                isSynchronized: false,
            });
        },
        [state, setState]
    );
    const addParameterName = useCallback(() => {
        setState({
            ...state,
            ...AHP.addParameterName(
                state.parameterNames,
                state.parameterComparisons,
                state.objectComparisons
            ),
            isSynchronized: false,
        });
    }, [state, setState]);
    const deleteParameterName = useCallback(
        (index) => {
            setState({
                ...state,
                ...AHP.deleteParameterName(
                    state.parameterNames,
                    state.parameterComparisons,
                    state.objectComparisons,
                    index
                ),
                isSynchronized: false,
            });
        },
        [state, setState]
    );
    const addObjectName = useCallback(() => {
        setState({
            ...state,
            ...AHP.addObjectName(state.objectNames, state.objectComparisons),
            isSynchronized: false,
        });
    }, [state, setState]);
    const deleteObjectName = useCallback(
        (index) => {
            setState({
                ...state,
                ...AHP.deleteObjectName(
                    state.objectNames,
                    state.objectComparisons,
                    index
                ),
                isSynchronized: false,
            });
        },
        [state, setState]
    );
    const setParameterComparison = useCallback(
        (index1, index2, value) => {
            setState({
                ...state,
                ...AHP.setParameterComparison(
                    state.parameterComparisons,
                    index1,
                    index2,
                    value
                ),
                isSynchronized: false,
            });
        },
        [state, setState]
    );
    const setObjectComparison = useCallback(
        (parameterIndex, objectIndex1, objectIndex2, value) => {
            setState({
                ...state,
                ...AHP.setObjectComparison(
                    state.objectComparisons,
                    parameterIndex,
                    objectIndex1,
                    objectIndex2,
                    value
                ),
                isSynchronized: false,
            });
        },
        [state, setState]
    );
    const setSynchronized = useCallback(() => {
        setState({
            ...state,
            isSynchronized: true,
        });
    }, [state, setState]);
    const setSolutionState = useCallback(
        (newState) => {
            setState({
                ...convertStateToInnerFormat(newState),
                isSynchronized: true,
            });
        },
        [state, useState]
    );
    const resetSolutionState = useCallback(() => {
        setSolutionState(defaultState);
    }, [state, setState]);

    return {
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
    };
};

const calculateSolutionResult = (objectComparisons, parameterComparisons, errors, setState, resultTasksState) => {
    if (errors.result) {
        return;
    }

    const objectComparisonsAsValues = convertComparisonIndexToValue(objectComparisons);
    const objectComparisonsAsBigIntegers = convertToBig(objectComparisonsAsValues);
    const parameterComparisonsAsValues = convertComparisonIndexToValue(parameterComparisons);
    const parameterComparisonsAsBigIntegers = convertToBig(parameterComparisonsAsValues);
    const {
        promise: priorityVectorCalculationPromise,
        cancel: priorityVectorCalculationCancel,
    } = getPriorityVector(parameterComparisonsAsBigIntegers);
    const {
        promise: objectComparisonsCalculationPromise,
        cancel: objectComparisonsCalculationCancel,
    } = getPriorityMatrix(objectComparisonsAsBigIntegers);

    if (resultTasksState.current.cancel) {
        resultTasksState.current.cancel();
        resultTasksState.current.cancel = null;
    }

    resultTasksState.current.cancel = () => {
        priorityVectorCalculationCancel();
        objectComparisonsCalculationCancel();
    };

    Promise.all([
        priorityVectorCalculationPromise,
        objectComparisonsCalculationPromise,
    ]).then(
        ([
            parameterPriorityVector,
            objectPriorityMatrix,
        ]) => {
            setState((state) => ({
                ...state,
                parameterPriorityVector,
                parameterMatrixConsistency: getCoherenceRelation(
                    parameterComparisonsAsBigIntegers,
                    parameterPriorityVector
                ),
                objectPriorityMatrix,
                objectMatrixConsistencies: getObjectCoherenceRelations(
                    objectComparisonsAsBigIntegers,
                    objectPriorityMatrix
                ),
                overallRanking: getNormalizedOverallRankingByPriorities(
                    parameterPriorityVector,
                    objectPriorityMatrix
                ),
            }));
        }
    ).catch(() => void 0);
};

const debouncedCalculateResult = debounce(calculateSolutionResult);


const useResultCalculation = (state, errors, setState, resultTasksState) => {
    useEffect(() => {
        debouncedCalculateResult(
            state.objectComparisons,
            state.parameterComparisons,
            errors,
            setState,
            resultTasksState
        );
    }, [
        state.objectComparisons,
        state.parameterComparisons,
        state.objectNames.length,
        state.parameterNames.length,
        errors.result,
        setState,
    ]);
};

export const useSolution = (initialState = defaultState) => {
    const resultTasksState = useRef({
        cancel: null,
    });

    const [state, setState] = useState(convertStateToInnerFormat(initialState));
    const errors = getErrors(state);

    useResultCalculation(state, errors, setState, resultTasksState);

    return {
        state,
        errors,
        operations: getOperations(state, setState),
    };
};
