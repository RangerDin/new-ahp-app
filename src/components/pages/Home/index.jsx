import {h} from 'preact';

import PageContainer from 'components/common/PageContainer';
import Header from './components/Header';
import MethodDescription from './components/MethodDescription';
import Question from './components/Question';
import Description from './components/Description';
import NameInputs from './components/NameInputs';
import Comparisons from './components/Comparisons';
import ResultPriorityTable from './components/ResultPriorityTable';
import ConsistencyTable from './components/ConsistencyTable';
import SaveButton from './components/SaveButton';
import SolutionIsSavedLabel from './components/SolutionIsSavedLabel';
import {saveAsFile} from 'utils/saving/file';
import beforeUnloadEffect from 'utils/beforeUnloadEffect';
import {useEffect, useRef} from 'preact/hooks';
import {useSolution} from 'utils/useSolution';
import style from './style.scss';
import {
    MAX_PARAMETERS_COUNT,
    MIN_PARAMETERS_COUNT,
    MAX_OBJECTS_COUNT,
    MIN_OBJECTS_COUNT,
} from 'constants/comparisons';

const Home = (props) => {
    const ref = useRef();
    const {
        state: {
            isSynchronized,
            question,
            description,
            parameterNames,
            parameterComparisons,
            objectNames,
            objectComparisons,
        },
        operations: {
            setQuestion,
            setDescription,
            changeParameterName,
            changeObjectName,
            deleteParameterName,
            deleteObjectName,
            addParameterName,
            addObjectName,
            setParameterComparison,
            setObjectComparison,
            setSynchronized,
            resetSolutionState,
            setSolutionState,
        },
    } = useSolution();
    const areObjectNamesFilled = objectNames.every(Boolean);
    const areParameterNamesFilled = parameterNames.some(Boolean);

    const onSaveButtonClick = () => {
        saveAsFile({
            question,
            description,
            parameterNames,
            parameterComparisons,
            objectNames,
            objectComparisons,
        });
        setSynchronized();
    };

    const onBeforeUnload = (event) => {
        if (!isSynchronized) {
            event.returnValue =
                'You have unsaved changes. Are you sure you want to leave?';
        }
    };

    beforeUnloadEffect(onBeforeUnload);

    useEffect(() => {
        if (!isSynchronized) {
            ref.unblock = props.history.block(
                'You have unsaved changes. Are you sure you want to leave?'
            );
        } else if (ref.unblock) {
            ref.unblock();
        }
    }, [isSynchronized]);

    useEffect(
        () => () => {
            if (ref.unblock) {
                ref.unblock();
            }
        },
        []
    );

    useEffect(() => {
        const locationState = props.history.location.state;

        if (!locationState || locationState.action !== 'load') {
            return;
        }

        const loadedSolution = locationState.solution;

        setSolutionState(loadedSolution);
        props.history.location.state = null;
    }, [props.history.location.state]);

    useEffect(() => {
        if (!ref.firstLoaded) {
            ref.firstLoaded = true;
            return;
        }

        const locationState = props.history.location.state;
        if (locationState && locationState.action === 'new') {
            props.history.location.state = null;
            resetSolutionState();
        }
    }, [props]);

    return (
        <PageContainer>
            <Header />
            <MethodDescription />
            <Question value={question} setValue={setQuestion} />
            <Description value={description} setValue={setDescription} />
            <div className={style['home__name-inputs']}>
                <NameInputs
                    className={style['home__objects-name-inputs']}
                    names={objectNames}
                    labelText='Enter the names of the objects you want to compare.'
                    inputPlaceholder='Name of object'
                    hasDeleteButton={objectNames.length > MIN_OBJECTS_COUNT}
                    hasAddButton={objectNames.length < MAX_OBJECTS_COUNT}
                    addButtonText='Add object'
                    onNameChange={changeObjectName}
                    onNameDelete={deleteObjectName}
                    onNameAdd={addObjectName}
                />
                <NameInputs
                    className={style['home__parameters-name-inputs']}
                    names={parameterNames}
                    labelText='Enter the names of the parameters by which you want to compare the objects.'
                    inputPlaceholder='Name of parameter'
                    hasDeleteButton={
                        parameterNames.length > MIN_PARAMETERS_COUNT
                    }
                    hasAddButton={parameterNames.length < MAX_PARAMETERS_COUNT}
                    addButtonText='Add parameter'
                    onNameChange={changeParameterName}
                    onNameDelete={deleteParameterName}
                    onNameAdd={addParameterName}
                />
            </div>
            {areParameterNamesFilled && (
                <Comparisons
                    names={parameterNames}
                    comparisons={parameterComparisons}
                    setComparisons={setParameterComparison}
                    label='Compare parameters'
                />
            )}
            {areParameterNamesFilled &&
                areObjectNamesFilled &&
                parameterNames.map((parameterName, parameterIndex) => (
                    <Comparisons
                        names={objectNames}
                        comparisons={objectComparisons[parameterIndex]}
                        setComparisons={(index1, index2, value) =>
                            setObjectComparison(
                                parameterIndex,
                                index1,
                                index2,
                                value
                            )
                        }
                        label={`Compare objects by parameter ${parameterName}`}
                    />
                ))}
            {areParameterNamesFilled && areObjectNamesFilled && (
                <ResultPriorityTable
                    parameterComparisons={parameterComparisons}
                    objectComparisons={objectComparisons}
                    objectNames={objectNames}
                />
            )}
            {areParameterNamesFilled && areObjectNamesFilled && (
                <ConsistencyTable
                    parameterComparisons={parameterComparisons}
                    objectComparisons={objectComparisons}
                    parameterNames={parameterNames}
                />
            )}
            {areParameterNamesFilled &&
                areObjectNamesFilled &&
                !isSynchronized && <SaveButton onClick={onSaveButtonClick} />}
            {areParameterNamesFilled &&
                areObjectNamesFilled &&
                isSynchronized && (
                <SolutionIsSavedLabel>
                        Solution is saved
                </SolutionIsSavedLabel>
            )}
        </PageContainer>
    );
};

export default Home;
