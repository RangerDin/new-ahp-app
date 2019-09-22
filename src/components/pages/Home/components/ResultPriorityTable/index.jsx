import {h, Fragment} from 'preact';

import Label from 'components/common/Label';
import {getOverallRanking} from 'utils/math/ham';
import style from './style.scss';
import {SHORT_COMPARISON_PRECISION} from 'constants/comparisons';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/translation';

const ResultPriorityTable = ({
    parameterComparisons,
    objectComparisons,
    objectNames,
}) => {
    const {t} = useContext(TranslationContext);
    const overallRanking = getOverallRanking(
        parameterComparisons,
        objectComparisons
    );

    return (
        <Fragment>
            <Label className={style.result__header}>
                {t('home.result-priority-table.label')}
            </Label>
            <table className={style.result__table}>
                <tr>
                    <th>{t('home.result-priority-table.objects-title')}</th>
                    <th>{t('home.result-priority-table.priorities-title')}</th>
                </tr>
                {overallRanking.map((value, index) => (
                    <tr className={style['result__object']}>
                        <td className={style['result__object-name']}>
                            {objectNames[index]}
                        </td>
                        <td className={style['result__object-priority']}>
                            {value[0].toFixed(SHORT_COMPARISON_PRECISION)}
                        </td>
                    </tr>
                ))}
            </table>
        </Fragment>
    );
};

export default ResultPriorityTable;
