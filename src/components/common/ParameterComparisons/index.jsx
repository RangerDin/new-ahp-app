import {h} from 'preact';
import Comparisons from '../Comparisons';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/useTranslation';

export const ParameterComparisons = ({
    names,
    comparisons,
    setComparisons,
    isErrorVisible,
}) => {
    const {t} = useContext(TranslationContext);

    return (
        <Comparisons
            names={names}
            comparisons={comparisons}
            setComparisons={setComparisons}
            label={t('home.parameters.comparisons.label')}
            errorText={t('home.parameters.comparisons.popup-error')}
            isErrorVisible={isErrorVisible}
        />
    );
};
