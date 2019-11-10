import {h, Fragment} from 'preact';
import Comparisons from '../Comparisons';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/useTranslation';

export const ObjectComparisons = ({
    parameterNames,
    objectNames,
    objectComparisons,
    setObjectComparison,
    isErrorVisible,
}) => {
    const {t} = useContext(TranslationContext);
    const setComparisons = (parameterIndex) => (index1, index2, value) =>
        setObjectComparison(parameterIndex, index1, index2, value);

    return (
        <Fragment>
            {parameterNames.map((parameterName, parameterIndex) => (
                <Comparisons
                    names={objectNames}
                    comparisons={objectComparisons[parameterIndex]}
                    setComparisons={setComparisons(parameterIndex)}
                    label={`${t(
                        'home.objects.comparisons.label'
                    )} ${parameterName}`}
                    errorText={t('home.objects.comparisons.popup-error')}
                    isErrorVisible={isErrorVisible}
                />
            ))}
        </Fragment>
    );
};
