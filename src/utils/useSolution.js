import {useState, useEffect, useMemo, useCallback} from 'preact/hooks';

import {COMPARISON_VALUES} from 'constants/comparisons';
import convertToBig from 'utils/structures/convertToBig';
import AHP from 'utils/structures/ahp';
import {
    getPriorityVector,
    getPriorityMatrix,
    getCoherenceRelation,
    getObjectCoherenceRelations,
    getNormalizedOverallRankingByPriorities,
} from './math/ahp';
import {useRef} from 'react';

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
    parameterPriorityVector: null,
    parameterMatrixConsistency: null,
    objectPriorityMatrix: null,
    objectMatrixConsistencies: null,
    overallRanking: null,
};

const convertStateToInnerFormat = (state) => ({
    ...state,
    parameterComparisons: convertToBig(state.parameterComparisons),
    objectComparisons: convertToBig(state.objectComparisons),
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

const useResultCalculation = (state, errors, setState, resultTasksState) => {
    const calculateResult = useCallback(
        (resultId) => {
            if (errors.result) {
                return;
            }

            Promise.all([
                getPriorityVector(state.parameterComparisons),
                getPriorityMatrix(state.objectComparisons),
            ]).then(
                ([
                    [parameterPriorityVector, parameterTimeoutIds],
                    [objectPriorityMatrix, objectTimeoutIds],
                ]) => {
                    if (
                        resultTasksState.current.resultCalculationId !==
                        resultId
                    ) {
                        return;
                    }

                    resultTasksState.current.childTaskTimeoutIds = [
                        ...parameterTimeoutIds,
                        ...objectTimeoutIds,
                    ];

                    setState({
                        ...state,
                        parameterPriorityVector,
                        parameterMatrixConsistency: getCoherenceRelation(
                            state.parameterComparisons,
                            parameterPriorityVector
                        ),
                        objectPriorityMatrix,
                        objectMatrixConsistencies: getObjectCoherenceRelations(
                            state.objectComparisons,
                            objectPriorityMatrix
                        ),
                        overallRanking: getNormalizedOverallRankingByPriorities(
                            parameterPriorityVector,
                            objectPriorityMatrix
                        ),
                    });
                }
            );
        },
        [state, setState, errors.result]
    );
    const scheduleResultCalculation = useCallback(() => {
        if (resultTasksState.current.resultCalculationTimeout) {
            clearTimeout(resultTasksState.current.resultCalculationTimeout);
            resultTasksState.current.resultCalculationTimeout = null;
            resultTasksState.current.childTaskTimeoutIds.forEach((timeoutId) =>
                clearTimeout(timeoutId)
            );
            resultTasksState.current.childTaskTimeoutIds = [];
        }

        resultTasksState.current.resultCalculationId++;
        resultTasksState.current.resultCalculationTimeout = setTimeout(
            calculateResult,
            100,
            resultTasksState.current.resultCalculationId
        );
    }, [calculateResult]);

    useEffect(scheduleResultCalculation, [
        state.objectNames,
        state.objectComparisons,
        state.parameterNames,
        state.parameterComparisons,
    ]);
};

export const useSolution = (initialState = defaultState) => {
    const resultTasksState = useRef({
        resultCalculationTimeout: null,
        resultCalculationId: 0,
        childTaskTimeoutIds: [],
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
