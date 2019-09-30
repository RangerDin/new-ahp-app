import {h} from 'preact';

import Label from 'components/common/Label';
import style from './style.scss';
import {SHORT_COMPARISON_PRECISION} from 'constants/comparisons';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/translation';
import {NAME_PLACEHOLDER} from 'constants/name';
import {ErrorPopup} from 'components/common/ErrorPopup';

const ConsistencyTable = ({
    parameterMatrixConsistency,
    objectMatrixConsistencies,
    parameterNames,
    error,
}) => {
    if (
        parameterMatrixConsistency === null ||
        objectMatrixConsistencies === null
    ) {
        return null;
    }

    const {t} = useContext(TranslationContext);

    return (
        <div className={style.consistency}>
            <Label className={style.consistency__header}>
                {t('home.consistency-ratio-table.label')}
            </Label>
            <table className={style.consistency__table}>
                <tr>
                    <th>{t('home.consistency-ratio-table.matrix-label')}</th>
                    <th>{t('home.consistency-ratio-table.value-label')}</th>
                </tr>
                <tr>
                    <td>
                        {t('home.consistency-ratio-table.parameters-label')}
                    </td>
                    <td>
                        {parameterMatrixConsistency.toFixed(
                            SHORT_COMPARISON_PRECISION
                        )}
                    </td>
                </tr>
                {objectMatrixConsistencies.map((value, index) => (
                    <tr
                        key={index}
                        className={style['consistency__consistency-record']}
                    >
                        <td className={style['consistency__matrix-name']}>{`${t(
                            'home.consistency-ratio-table.objects-label'
                        )} "${parameterNames[index] || NAME_PLACEHOLDER}`}</td>
                        <td className={style['consistency__consistency-value']}>
                            {value.toFixed(SHORT_COMPARISON_PRECISION)}
                        </td>
                    </tr>
                ))}
            </table>
            <ErrorPopup className={style['consistency__error-popup']} isOpen={error}>
                {error}
            </ErrorPopup>
        </div>
    );
};

export default ConsistencyTable;
