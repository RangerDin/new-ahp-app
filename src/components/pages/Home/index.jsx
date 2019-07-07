import {h} from 'preact';
import {useEffect} from 'preact/hooks';

import PageContainer from 'components/common/PageContainer';
import {useSolution} from 'utils/useSolution';
import {
    saveSolutionToLocalhost, loadSolutionFromLocalhost,
} from 'utils/saving/localhost';
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

const MIN_OBJECTS_COUNT = 2;
const MIN_PARAMETERS_COUNT = 1;

const Home = (props) => {
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
            setSolutionState,
        },
    } = useSolution();
    const areObjectNamesFilled = objectNames.every(Boolean);
    const areParameterNamesFilled = parameterNames.some(Boolean);

    const onSaveButtonClick = () => {
        saveSolutionToLocalhost({
            question,
            description,
            parameterNames,
            parameterComparisons,
            objectNames,
            objectComparisons,
        });
        setSynchronized();
    };

    useEffect(() => {
        const solutionId = props.matches.id;

        if (!solutionId) {
            return;
        }

        const loadedSolution = loadSolutionFromLocalhost(solutionId);

        setSolutionState(loadedSolution);
    }, [props.matches.id]);

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
            {areParameterNamesFilled && areObjectNamesFilled && !isSynchronized && (
                <SaveButton onClick={onSaveButtonClick} />
            )}
            {
                isSynchronized && (
                    <SolutionIsSavedLabel>Solution is saved</SolutionIsSavedLabel>
                )
            }
        </PageContainer>
    );
};

export default Home;
