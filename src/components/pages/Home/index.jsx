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
import useBeforeUnload from 'utils/useBeforeUnload';
import {useEffect, useRef, useContext} from 'preact/hooks';
import {useSolution} from 'utils/useSolution';
import PageHeader from 'components/common/PageHeader';
import {EntityNameInputs} from './components/EntityNameInputs';
import {TranslationContext} from 'utils/useTranslation';
import {MENU_ACTIONS} from 'constants/actions';

const Home = (props) => {
    const ref = useRef();
    const {state, operations} = useSolution();

    const onSaveButtonClick = () => {
        saveAsFile({
            question: state.question,
            description: state.description,
            parameterNames: state.parameterNames,
            parameterComparisons: state.parameterComparisons,
            objectNames: state.objectNames,
            objectComparisons: state.objectComparisons,
        });
        operations.setSynchronized();
    };

    const onBeforeUnload = (event) => {
        if (!state.isSynchronized) {
            event.returnValue =
                'You have unsaved changes. Are you sure you want to leave?';
        }
    };

    useBeforeUnload(onBeforeUnload, state.isSynchronized);

    useEffect(() => {
        if (!state.isSynchronized) {
            ref.unblock = props.history.block(
                'You have unsaved changes. Are you sure you want to leave?'
            );
        } else if (ref.unblock) {
            ref.unblock();
        }
    }, [state.isSynchronized]);

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

        operations.setSolutionState(loadedSolution);
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
            operations.resetSolutionState();
        }
    }, [props]);

    const {t} = useContext(TranslationContext);

    return (
        <PageContainer>
            <PageHeader>{t('home.header')}</PageHeader>
            <MethodDescription history={props.history} />
            <Question
                value={state.question}
                setValue={operations.setQuestion}
            />
            <Description
                value={state.description}
                setValue={operations.setDescription}
            />
            <EntityNameInputs
                objectNames={state.objectNames}
                changeObjectName={operations.changeObjectName}
                deleteObjectName={operations.deleteObjectName}
                addObjectName={operations.addObjectName}
                parameterNames={state.parameterNames}
                changeParameterName={operations.changeParameterName}
                deleteParameterName={operations.deleteParameterName}
                addParameterName={operations.addParameterName}
                isObjectNameDuplicated={operations.isObjectNameDuplicated}
                isParameterNameDuplicated={operations.isParameterNameDuplicated}
            />
            <Comparisons
                names={state.parameterNames}
                comparisons={state.parameterComparisons}
                setComparisons={operations.setParameterComparison}
                label={t('home.parameters.comparisons.label')}
                errorText={t('home.parameters.comparisons.popup-error')}
                isErrorVisible={
                    !operations.areParameterNamesFilled() ||
                    operations.areParameterNamesDuplicated()
                }
            />
            {state.parameterNames.map((parameterName, parameterIndex) => (
                <Comparisons
                    names={state.objectNames}
                    comparisons={state.objectComparisons[parameterIndex]}
                    setComparisons={(index1, index2, value) =>
                        operations.setObjectComparison(
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
                        !operations.areObjectNamesFilled() ||
                        !operations.areParameterNamesFilled() ||
                        operations.areObjectNamesDuplicated()
                    }
                />
            ))}
            <ResultPriorityTable
                overallRanking={state.overallRanking}
                objectNames={state.objectNames}
                error={
                    (!operations.areObjectNamesFilled() ||
                        !operations.areParameterNamesFilled() ||
                        operations.areObjectNamesDuplicated() ||
                        operations.areParameterNamesDuplicated()) &&
                    t('home.result.popup-error')
                }
            />
            <ConsistencyTable
                parameterMatrixConsistency={state.parameterMatrixConsistency}
                objectMatrixConsistencies={state.objectMatrixConsistencies}
                parameterNames={state.parameterNames}
                error={
                    (!operations.areObjectNamesFilled() ||
                        !operations.areParameterNamesFilled() ||
                        operations.areObjectNamesDuplicated() ||
                        operations.areParameterNamesDuplicated()) &&
                    t('home.consistency.popup-error')
                }
            />
            <SaveButton
                error={
                    (!state.question ||
                        !state.description ||
                        !operations.areParameterNamesFilled() ||
                        !operations.areObjectNamesFilled() ||
                        operations.areObjectNamesDuplicated() ||
                        operations.areParameterNamesDuplicated()) &&
                    t('home.save-button.popup-error')
                }
                onClick={onSaveButtonClick}
            />
            {operations.areParameterNamesFilled() &&
                operations.areObjectNamesFilled() &&
                state.isSynchronized && <SolutionIsSavedLabel />}
        </PageContainer>
    );
};

export default Home;
