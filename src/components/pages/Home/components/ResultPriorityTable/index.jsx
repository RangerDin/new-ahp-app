import {h, Fragment} from 'preact';

import Label from 'components/common/Label';
import {getOverallRanking} from 'utils/math/ham';
import style from './style.scss';

const ResultPriorityTable = ({
    parameterComparisons,
    objectComparisons,
    objectNames,
}) => {
    const overallRanking = getOverallRanking(
        parameterComparisons,
        objectComparisons
    );

    return (
        <Fragment>
            <Label className={style.result__header}>
                Result priority table
            </Label>
            <table className={style.result__table}>
                <tr>
                    <th>Object</th>
                    <th>Priorities</th>
                </tr>
                {overallRanking.map((value, index) => (
                    <tr>
                        <td>{objectNames[index]}</td>
                        <td>{value[0].toFixed(2)}</td>
                    </tr>
                ))}
            </table>
        </Fragment>
    );
};

export default ResultPriorityTable;
