import {h} from 'preact';
import {useState} from 'preact/hooks';

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
import {useNamesAndComparisons} from 'utils/hamHook';

const MIN_OBJECTS_COUNT = 2;
const MIN_PARAMETERS_COUNT = 1;

const Home = () => {
    const [question, setQuestion] = useState('');
    const [description, setDescription] = useState('');
    const {
        state: {
            parameterNames,
            parameterComparisons,
            objectNames,
            objectComparisons,
        },
        operations: {
            changeParameterName,
            changeObjectName,
            deleteParameterName,
            deleteObjectName,
            addParameterName,
            addObjectName,
            setParameterComparison,
            setObjectComparison,
        },
    } = useNamesAndComparisons();
    const areObjectNamesFilled = objectNames.every(Boolean);
    const areParameterNamesFilled = parameterNames.some(Boolean);

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
            {areParameterNamesFilled && areObjectNamesFilled && <SaveButton />}
        </PageContainer>
    );
};

export default Home;
