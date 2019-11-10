import {h} from 'preact';

import PageContainer from 'components/common/PageContainer';
import MethodDescription from './components/MethodDescription';
import Question from '../../common/Question';
import Description from '../../common/Description';
import ResultPriorityTable from './components/ResultPriorityTable';
import ConsistencyTable from './components/ConsistencyTable';
import SaveButton from './components/SaveButton';
import SolutionIsSavedLabel from './components/SolutionIsSavedLabel';
import {saveToFile} from 'utils/saving/file';
import useBeforeUnload from 'utils/useBeforeUnload';
import {useEffect, useContext} from 'preact/hooks';
import {useSolution} from 'utils/useSolution';
import PageHeader from 'components/common/PageHeader';
import {EntityNameInputs} from './components/EntityNameInputs';
import {TranslationContext} from 'utils/useTranslation';
import {MENU_ACTIONS} from 'constants/actions';
import usePageSynchronizationBlock from 'utils/usePageSynchronizationBlock';
import {BEFORE_UNLOAD_MESSAGE} from 'constants/messages';
import {ParameterComparisons} from 'components/common/ParameterComparisons';
import {ObjectComparisons} from 'components/common/ObjectComparisons';

const Home = (props) => {
    const {state, operations, errors} = useSolution();

    const onSaveButtonClick = () => {
        saveToFile(state);
        operations.setSynchronized();
    };

    const onBeforeUnload = (event) => {
        if (!state.isSynchronized) {
            event.returnValue = BEFORE_UNLOAD_MESSAGE;
        }
    };
    useBeforeUnload(onBeforeUnload, state.isSynchronized);

    const onPageChange = () =>
        props.history.block(
            'You have unsaved changes. Are you sure you want to leave?'
        );
    usePageSynchronizationBlock(onPageChange, state.isSynchronized);

    useEffect(() => {
        const locationState = props.history.location.state;

        if (locationState && locationState.action === MENU_ACTIONS.LOAD) {
            operations.setSolutionState(locationState.solution);
            props.history.location.state = null;
        }

        if (locationState && locationState.action === MENU_ACTIONS.NEW) {
            operations.resetSolutionState();
            props.history.location.state = null;
        }
    }, [props.history.location.state]);

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
                isObjectNameDuplicated={errors.isObjectNameDuplicated}
                isParameterNameDuplicated={errors.isParameterNameDuplicated}
            />
            <ParameterComparisons
                names={state.parameterNames}
                comparisons={state.parameterComparisons}
                setComparisons={operations.setParameterComparison}
                isErrorVisible={errors.parameterComparisons}
            />
            <ObjectComparisons
                parameterNames={state.parameterNames}
                objectNames={state.objectNames}
                objectComparisons={state.objectComparisons}
                setObjectComparison={operations.setObjectComparison}
                isErrorVisible={errors.objectComparisons}
            />
            <ResultPriorityTable
                overallRanking={state.overallRanking}
                objectNames={state.objectNames}
                error={errors.result && t('home.result.popup-error')}
            />
            <ConsistencyTable
                parameterMatrixConsistency={state.parameterMatrixConsistency}
                objectMatrixConsistencies={state.objectMatrixConsistencies}
                parameterNames={state.parameterNames}
                error={errors.consistency && t('home.consistency.popup-error')}
            />
            <SaveButton
                error={errors.save && t('home.save-button.popup-error')}
                onClick={onSaveButtonClick}
            />
            {!errors.save &&
                state.isSynchronized && <SolutionIsSavedLabel />}
        </PageContainer>
    );
};

export default Home;
