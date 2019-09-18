import {h} from 'preact';

import PageContainer from 'components/common/PageContainer';
import MethodDescription from './components/MethodDescription';
import Question from '../../common/Question';
import Description from '../../common/Description';
import Comparisons from '../../common/Comparisons';
import ResultPriorityTable from './components/ResultPriorityTable';
import ConsistencyTable from './components/ConsistencyTable';
import SaveButton from './components/SaveButton';
import SolutionIsSavedLabel from './components/SolutionIsSavedLabel';
import {saveAsFile} from 'utils/saving/file';
import beforeUnloadEffect from 'utils/beforeUnloadEffect';
import {useEffect, useRef} from 'preact/hooks';
import {useSolution} from 'utils/useSolution';
import PageHeader from 'components/common/PageHeader';
import {EntityNameInputs} from './components/EntityNameInputs';

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
            areObjectNamesFilled,
            areParameterNamesFilled,
        },
    } = useSolution();

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

    beforeUnloadEffect(onBeforeUnload, isSynchronized);

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
            <PageHeader>Analytic Hierarchy Process</PageHeader>
            <MethodDescription />
            <Question value={question} setValue={setQuestion} />
            <Description value={description} setValue={setDescription} />
            <EntityNameInputs
                objectNames={objectNames}
                changeObjectName={changeObjectName}
                deleteObjectName={deleteObjectName}
                addObjectName={addObjectName}
                parameterNames={parameterNames}
                changeParameterName={changeParameterName}
                deleteParameterName={deleteParameterName}
                addParameterName={addParameterName}
            />
            {areParameterNamesFilled() && (
                <Comparisons
                    names={parameterNames}
                    comparisons={parameterComparisons}
                    setComparisons={setParameterComparison}
                    label='Compare parameters'
                />
            )}
            {areParameterNamesFilled() &&
                areObjectNamesFilled() &&
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
            {areParameterNamesFilled() && areObjectNamesFilled() && (
                <ResultPriorityTable
                    parameterComparisons={parameterComparisons}
                    objectComparisons={objectComparisons}
                    objectNames={objectNames}
                />
            )}
            {areParameterNamesFilled() && areObjectNamesFilled() && (
                <ConsistencyTable
                    parameterComparisons={parameterComparisons}
                    objectComparisons={objectComparisons}
                    parameterNames={parameterNames}
                />
            )}
            {areParameterNamesFilled() &&
                areObjectNamesFilled() &&
                !isSynchronized && <SaveButton onClick={onSaveButtonClick} />}
            {areParameterNamesFilled() &&
                areObjectNamesFilled() &&
                isSynchronized && (
                <SolutionIsSavedLabel>
                        Solution is saved
                </SolutionIsSavedLabel>
            )}
        </PageContainer>
    );
};

export default Home;
