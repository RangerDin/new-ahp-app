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
import {useEffect, useRef, useContext} from 'preact/hooks';
import {useSolution} from 'utils/useSolution';
import PageHeader from 'components/common/PageHeader';
import {EntityNameInputs} from './components/EntityNameInputs';
import {TranslationContext} from 'utils/useTranslation';
import {MENU_ACTIONS} from 'constants/actions';

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
            parameterMatrixConsistency,
            objectMatrixConsistencies,
            overallRanking,
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
            isObjectNameDuplicated,
            isParameterNameDuplicated,
            areObjectNamesDuplicated,
            areParameterNamesDuplicated,
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

        if (!locationState || locationState.action !== MENU_ACTIONS.LOAD) {
            return;
        }

        const loadedSolution = locationState.solution;

        setSolutionState(loadedSolution);
        props.history.location.state = null;
    }, [props.history.location.state]);

    useEffect(() => {
        if (!ref.firstLoaded) {
            ref.firstLoaded = true;
            props.history.location.state = null;
            return;
        }

        const locationState = props.history.location.state;
        if (locationState && locationState.action === MENU_ACTIONS.NEW) {
            props.history.location.state = null;
            resetSolutionState();
        }
    }, [props]);

    const {t} = useContext(TranslationContext);

    return (
        <PageContainer>
            <PageHeader>{t('home.header')}</PageHeader>
            <MethodDescription history={props.history} />
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
                isObjectNameDuplicated={isObjectNameDuplicated}
                isParameterNameDuplicated={isParameterNameDuplicated}
            />
            <Comparisons
                names={parameterNames}
                comparisons={parameterComparisons}
                setComparisons={setParameterComparison}
                label={t('home.parameters.comparisons.label')}
                errorText={t('home.parameters.comparisons.popup-error')}
                isErrorVisible={
                    !areParameterNamesFilled() || areParameterNamesDuplicated()
                }
            />
            {parameterNames.map((parameterName, parameterIndex) => (
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
                    label={`${t(
                        'home.objects.comparisons.label'
                    )} ${parameterName}`}
                    errorText={t('home.objects.comparisons.popup-error')}
                    isErrorVisible={
                        !areObjectNamesFilled() ||
                        !areParameterNamesFilled() ||
                        areObjectNamesDuplicated()
                    }
                />
            ))}
            <ResultPriorityTable
                overallRanking={overallRanking}
                objectNames={objectNames}
                error={
                    (!areObjectNamesFilled() ||
                        !areParameterNamesFilled() ||
                        areObjectNamesDuplicated() ||
                        areParameterNamesDuplicated()) &&
                    t('home.result.popup-error')
                }
            />
            <ConsistencyTable
                parameterMatrixConsistency={parameterMatrixConsistency}
                objectMatrixConsistencies={objectMatrixConsistencies}
                parameterNames={parameterNames}
                error={
                    (!areObjectNamesFilled() ||
                        !areParameterNamesFilled() ||
                        areObjectNamesDuplicated() ||
                        areParameterNamesDuplicated()) &&
                    t('home.consistency.popup-error')
                }
            />
            <SaveButton
                error={
                    (!question ||
                        !description ||
                        !areParameterNamesFilled() ||
                        !areObjectNamesFilled() ||
                        areObjectNamesDuplicated() ||
                        areParameterNamesDuplicated()) &&
                    t('home.save-button.popup-error')
                }
                onClick={onSaveButtonClick}
            />
            {areParameterNamesFilled() &&
                areObjectNamesFilled() &&
                isSynchronized && <SolutionIsSavedLabel />}
        </PageContainer>
    );
};

export default Home;
