import {h, Fragment} from 'preact';

import Label from 'components/common/Label';
import {
    getCoherenceRelation,
    getPriorityVector,
    getObjectCoherenceRelations,
    getPriorityMatrix,
} from 'utils/math/ham';
import style from './style.scss';
import {SHORT_COMPARISON_PRECISION} from 'constants/comparisons';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/translation';

const ConsistencyTable = ({
    parameterComparisons,
    objectComparisons,
    parameterNames,
}) => {
    const parameterMatrixConsistency = getCoherenceRelation(
        parameterComparisons,
        getPriorityVector(parameterComparisons)
    );
    const objectMatrixConsistencies = getObjectCoherenceRelations(
        objectComparisons,
        getPriorityMatrix(objectComparisons)
    );
    const {t} = useContext(TranslationContext);

    return (
        <Fragment>
            <Label className={style.result__header}>{t('home.consistency-ratio-table.label')}</Label>
            <table className={style.result__table}>
                <tr>
                    <th>{t('home.consistency-ratio-table.matrix-label')}</th>
                    <th>{t('home.consistency-ratio-table.value-label')}</th>
                </tr>
                <tr>
                    <td>{t('home.consistency-ratio-table.parameters-label')}</td>
                    <td>{parameterMatrixConsistency.toFixed(SHORT_COMPARISON_PRECISION)}</td>
                </tr>
                {objectMatrixConsistencies.map((value, index) => (
                    <tr className={style['result__consistency-record']}>
                        <td
                            className={style['result__matrix-name']}
                        >{`${t('home.consistency-ratio-table.objects-label')} "${parameterNames[index]}"`}</td>
                        <td className={style['result__consistency-value']}>
                            {value.toFixed(SHORT_COMPARISON_PRECISION)}
                        </td>
                    </tr>
                ))}
            </table>
        </Fragment>
    );
};

export default ConsistencyTable;
