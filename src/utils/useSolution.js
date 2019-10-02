import {useState, useEffect} from 'preact/hooks';

import {COMPARISON_VALUES} from 'constants/comparisons';
import convertToBig from 'utils/structures/convertToBig';
import HAM from 'utils/structures/ham';
import {
    getPriorityVector,
    getPriorityMatrix,
    getCoherenceRelation,
    getObjectCoherenceRelations,
    getOverallRankingByPriorities,
} from './math/ham';

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

let resultCalculationTimeout = null;
let resultCalculationId = 0;
let childTaskTimeoutIds = [];

export const useSolution = (initialState = defaultState) => {
    const [state, setState] = useState(convertStateToInnerFormat(initialState));

    const calculateResult = (resultId) => {
        if (!areObjectNamesFilled() || !areParameterNamesFilled()) {
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
                if (resultCalculationId !== resultId) {
                    return;
                }

                childTaskTimeoutIds = [
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
                    overallRanking: getOverallRankingByPriorities(
                        parameterPriorityVector,
                        objectPriorityMatrix
                    ),
                });
            }
        );
    };

    const scheduleResultCalculation = () => {
        if (resultCalculationTimeout) {
            clearTimeout(resultCalculationTimeout);
            resultCalculationTimeout = null;
            childTaskTimeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
            childTaskTimeoutIds = [];
        }

        resultCalculationId++;
        resultCalculationTimeout = setTimeout(calculateResult, 100, resultCalculationId);
    };

    const setName = (nameListProperty) => (index, newName) => {
        setState({
            ...state,
            ...HAM.setName(
                nameListProperty,
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
            isSynchronized: false,
        });
    };

    const setDescription = (value) => {
        setState({
            ...state,
            description: value,
            isSynchronized: false,
        });
    };

    const addParameterName = () => {
        setState({
            ...state,
            ...HAM.addParameterName(
                state.parameterNames,
                state.parameterComparisons,
                state.objectComparisons
            ),
            isSynchronized: false,
        });
    };

    const deleteParameterName = (index) => {
        setState({
            ...state,
            ...HAM.deleteParameterName(
                state.parameterNames,
                state.parameterComparisons,
                state.objectComparisons,
                index
            ),
            isSynchronized: false,
        });
    };

    const addObjectName = () => {
        setState({
            ...state,
            ...HAM.addObjectName(state.objectNames, state.objectComparisons),
            isSynchronized: false,
        });
    };

    const deleteObjectName = (index) => {
        setState({
            ...state,
            ...HAM.deleteObjectName(
                state.objectNames,
                state.objectComparisons,
                index
            ),
            isSynchronized: false,
        });
    };

    const setParameterComparison = (index1, index2, value) => {
        setState({
            ...state,
            ...HAM.setParameterComparison(
                state.parameterComparisons,
                index1,
                index2,
                value
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
            ...HAM.setObjectComparison(
                state.objectComparisons,
                parameterIndex,
                objectIndex1,
                objectIndex2,
                value
            ),
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
        setState({
            ...convertStateToInnerFormat(newState),
            isSynchronized: true,
        });
    };

    const resetSolutionState = () => {
        setSolutionState(defaultState);
    };

    const areObjectNamesFilled = () => state.objectNames.every(Boolean);

    const areParameterNamesFilled = () => state.parameterNames.every(Boolean);

    useEffect(() => {
        scheduleResultCalculation();
    }, [
        state.parameterNames,
        state.parameterComparisons,
        state.objectNames,
        state.objectComparisons,
    ]);

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
            areObjectNamesFilled,
            areParameterNamesFilled,
            scheduleResultCalculation,
        },
    };
};
