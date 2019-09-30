import {h} from 'preact';

import Label from 'components/common/Label';
import style from './style.scss';
import {SHORT_COMPARISON_PRECISION} from 'constants/comparisons';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/translation';
import {NAME_PLACEHOLDER} from 'constants/name';
import {ErrorPopup} from 'components/common/ErrorPopup';

const ResultPriorityTable = ({overallRanking, objectNames, error}) => {
    if (!overallRanking) {
        return null;
    }

    const {t} = useContext(TranslationContext);

    return (
        <div className={style.result}>
            <Label className={style.result__header}>
                {t('home.result-priority-table.label')}
            </Label>
            <table className={style.result__table}>
                <tr>
                    <th>{t('home.result-priority-table.objects-title')}</th>
                    <th>{t('home.result-priority-table.priorities-title')}</th>
                </tr>
                {overallRanking.map((value, index) => (
                    <tr key={value} className={style['result__object']}>
                        <td className={style['result__object-name']}>
                            {objectNames[index] || NAME_PLACEHOLDER}
                        </td>
                        <td className={style['result__object-priority']}>
                            {value[0].toFixed(SHORT_COMPARISON_PRECISION)}
                        </td>
                    </tr>
                ))}
            </table>
            <ErrorPopup className={style['result__error-popup']} isOpen={error}>
                {error}
            </ErrorPopup>
        </div>
    );
};

export default ResultPriorityTable;
