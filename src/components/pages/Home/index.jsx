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
    const [parameterComparisons, setParameterComparisons] = useState([]);
    const [objectComparisons, setObjectComparisons] = useState([
        [
            {
                first: 0,
                second: 1,
                value: '',
            },
        ],
    ]);
    const [priorityTable] = useState([
        {name: 'Object 1', value: 0.72},
        {name: 'Object 2', value: 0.28},
    ]);
    const [consistencyTable] = useState([
        {name: 'parameters', value: 0.28},
        {name: 'objects by parameter "Alpha romero hru 15 v8"', value: 0.72},
    ]);

    const areParameterNamesFilled = parameterNames.every(Boolean);
    const areObjectNamesFilled = objectNames.every(Boolean);
    const getListWithChangedName = (names, index, value) => [
        ...names.slice(0, index),
        value,
        ...names.slice(index + 1),
    ];
    const getListWithDeletedName = (names, index) => [
        ...names.slice(0, index),
        ...names.slice(index + 1),
    ];
    const getListWithAddedName = (names) => [...names, ''];

    const getComparisonsWithAddedName = (comparisons, names) => [
        ...comparisons,
        ...names.map((_, index) => ({
            first: index,
            second: names.length,
            value: '',
        })),
    ];

    const getNewComparisonsByNames = (names) => {
        const comparisons = [];

        for (let i = 0; i < names.length - 1; i++) {
            for (let j = i + 1; j < names.length; j++) {
                comparisons.push({
                    first: i,
                    second: j,
                    value: '',
                });
            }
        }

        return comparisons;
    };

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
                onNameChange={(index, value) => {
                    setObjectNames(
                        getListWithChangedName(objectNames, index, value)
                    );
                }}
                onNameDelete={(index) => {
                    setObjectComparisons(
                        objectComparisons.map((comparisonsByParameter) =>
                            comparisonsByParameter
                                .filter(
                                    ({first, second}) =>
                                        index !== first && index !== second
                                )
                                .map(({first, second, value}) => ({
                                    first: first > index ? first - 1 : first,
                                    second:
                                        second > index ? second - 1 : second,
                                    value,
                                }))
                        )
                    );
                    setObjectNames(getListWithDeletedName(objectNames, index));
                }}
                onNameAdd={() => {
                    setObjectComparisons(
                        objectComparisons.map((comparisonsByParameter) =>
                            getComparisonsWithAddedName(
                                comparisonsByParameter,
                                objectNames
                            )
                        )
                    ),
                    setObjectNames(getListWithAddedName(objectNames));
                }}
            />
            <NameInputs
                labelText='Enter the names of the parameters by which you want to compare the objects.'
                inputPlaceholder='Name of parameter'
                names={parameterNames}
                hasDeleteButton={parameterNames.length > MIN_PARAMETERS_COUNT}
                addButtonText='Add parameter'
                onNameChange={(index, value) => {
                    setParameterNames(
                        getListWithChangedName(parameterNames, index, value)
                    );
                }}
                onNameDelete={(index) => {
                    setParameterComparisons(
                        parameterComparisons.filter(
                            ({first, second}) =>
                                index !== first && index !== second
                        )
                    );
                    setObjectComparisons([
                        ...objectComparisons.slice(0, index),
                        ...objectComparisons.slice(index + 1),
                    ]);
                    setParameterNames(
                        getListWithDeletedName(parameterNames, index)
                    );
                }}
                onNameAdd={() => {
                    setParameterComparisons(
                        getComparisonsWithAddedName(
                            parameterComparisons,
                            parameterNames
                        )
                    );
                    setObjectComparisons([
                        ...objectComparisons,
                        getNewComparisonsByNames(objectNames),
                    ]);
                    setParameterNames(getListWithAddedName(parameterNames));
                }}
            />
            {areParameterNamesFilled && (
                <Comparisons
                    names={parameterNames}
                    comparisons={parameterComparisons}
                    setComparisons={setParameterComparisons}
                    label='Compare parameters'
                />
            )}
            {areParameterNamesFilled &&
                areObjectNamesFilled &&
                parameterNames.map((parameterName, index) => (
                    <Comparisons
                        names={objectNames}
                        comparisons={objectComparisons[index]}
                        setComparisons={(comparisons) => {
                            setObjectComparisons([
                                ...objectComparisons.slice(0, index),
                                comparisons,
                                ...objectComparisons.slice(index + 1),
                            ]);
                        }}
                        label={`Compare objects by parameter ${parameterName}`}
                    />
                ))}
            <ResultPriorityTable priorities={priorityTable} />
            <ConsistencyTable consistencies={consistencyTable} />
            <SaveButton />
        </PageContainer>
    );
};

export default Home;
