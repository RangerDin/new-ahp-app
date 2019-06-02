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

const MIN_OBJECTS_COUNT = 2;
const MIN_PARAMETERS_COUNT = 1;

const Home = () => {
    const [question, setQuestion] = useState('');
    const [description, setDescription] = useState('');
    const [parameterNames, setParameterNames] = useState(['']);
    const [objectNames, setObjectNames] = useState(['', '']);
    const [parameterComparisons, setParameterComparisons] = useState([
        {
            parameter1: 'parameter1',
            parameter2: 'parameter2',
            value: '',
        },
    ]);
    const [objectComparisons, setObjectComparisons] = useState([
        {
            parameter1: 'object1',
            parameter2: 'object2',
            value: '',
        },
    ]);
    const [priorityTable] = useState([
        {name: 'Object 1', value: 0.72},
        {name: 'Object 2', value: 0.28},
    ]);
    const [consistencyTable] = useState([
        {name: 'parameters', value: 0.28},
        {name: 'objects by parameter "Alpha romero hru 15 v8"', value: 0.72},
    ]);

    return (
        <PageContainer>
            <Header />
            <MethodDescription />
            <Question value={question} setValue={setQuestion} />
            <Description value={description} setValue={setDescription} />
            <NameInputs
                labelText='Enter the names of the objects you want to compare.'
                inputPlaceholder='Name of object'
                names={objectNames}
                hasDeleteButton={objectNames.length > MIN_OBJECTS_COUNT}
                addButtonText='Add object'
                setNames={setObjectNames}
            />
            <NameInputs
                labelText='Enter the names of the parameters by which you want to compare the objects.'
                inputPlaceholder='Name of parameter'
                names={parameterNames}
                hasDeleteButton={
                    parameterNames.length > MIN_PARAMETERS_COUNT
                }
                addButtonText='Add parameter'
                setNames={setParameterNames}
            />
            <Comparisons
                comparisons={parameterComparisons}
                setComparisons={setParameterComparisons}
                label='Compare parameters'
            />
            <Comparisons
                comparisons={objectComparisons}
                setComparisons={setObjectComparisons}
                label='Compare objects'
            />
            <ResultPriorityTable priorities={priorityTable} />
            <ConsistencyTable consistencies={consistencyTable} />
            <SaveButton />
        </PageContainer>
    );
};

export default Home;
