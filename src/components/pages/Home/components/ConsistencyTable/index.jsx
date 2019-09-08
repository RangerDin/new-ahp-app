import {h, Fragment} from 'preact';

import Label from 'components/common/Label';
import {
    getCoherenceRelation,
    getPriorityVector,
    getObjectCoherenceRelations,
    getPriorityMatrix,
} from 'utils/math/ham';
import style from './style.scss';

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

    return (
        <Fragment>
            <Label className={style.result__header}>Consistency ratio</Label>
            <table className={style.result__table}>
                <tr>
                    <th>Matrix</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>parameters</td>
                    <td>{parameterMatrixConsistency}</td>
                </tr>
                {objectMatrixConsistencies.map((value, index) => (
                    <tr className={style['result__consistency-record']}>
                        <td
                            className={style['result__matrix-name']}
                        >{`objects by parameter "${parameterNames[index]}"`}</td>
                        <td className={style['result__consistency-value']}>
                            {value}
                        </td>
                    </tr>
                ))}
            </table>
        </Fragment>
    );
};

export default ConsistencyTable;
