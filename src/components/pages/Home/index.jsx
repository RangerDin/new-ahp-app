import {h} from 'preact';

import PageContainer from 'components/common/PageContainer';
import {useSolution} from 'utils/useSolution';
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

const MIN_OBJECTS_COUNT = 2;
const MIN_PARAMETERS_COUNT = 1;

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
        if (!ref.started) {
            ref.started = true;
        } else {
            resetSolutionState();
        }
    }, [props.matches]);

    return (
        <PageContainer>
            <Header />
            <MethodDescription />
            <Question value={question} setValue={setQuestion} />
            <Description value={description} setValue={setDescription} />
            <NameInputs
                names={objectNames}
                labelText='Enter the names of the objects you want to compare.'
                inputPlaceholder='Name of object'
                hasDeleteButton={objectNames.length > MIN_OBJECTS_COUNT}
                addButtonText='Add object'
                onNameChange={changeObjectName}
                onNameDelete={deleteObjectName}
                onNameAdd={addObjectName}
            />
            <NameInputs
                labelText='Enter the names of the parameters by which you want to compare the objects.'
                inputPlaceholder='Name of parameter'
                names={parameterNames}
                hasDeleteButton={parameterNames.length > MIN_PARAMETERS_COUNT}
                addButtonText='Add parameter'
                onNameChange={changeParameterName}
                onNameDelete={deleteParameterName}
                onNameAdd={addParameterName}
            />
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
            {isSynchronized && (
                <SolutionIsSavedLabel>Solution is saved</SolutionIsSavedLabel>
            )}
        </PageContainer>
    );
};

export default Home;
