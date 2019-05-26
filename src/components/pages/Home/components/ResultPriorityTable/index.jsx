import {h, Fragment} from 'preact';

import Label from 'components/common/Label';
import style from './style.scss';

const ResultPriorityTable = () => (
    <Fragment>
        <Label className={style.result__header}>Result priority table</Label>
        <table className={style.result__table}>
            <tr>
                <th>Object</th>
                <th>Priorities</th>
            </tr>
            <tr>
                <td>Object 1</td>
                <td>0.72</td>
            </tr>
            <tr>
                <td>Object 2</td>
                <td>0.28</td>
            </tr>
        </table>
    </Fragment>
);

export default ResultPriorityTable;
