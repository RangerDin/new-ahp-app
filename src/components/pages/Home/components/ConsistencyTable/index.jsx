import {h, Fragment} from 'preact';

import Label from 'components/common/Label';
import style from './style.scss';

const ConsistencyTable = () => (
    <Fragment>
        <Label className={style.result__header}>Consistency</Label>
        <table className={style.result__table}>
            <tr>
                <th>Matrix</th>
                <th>Consistency ratio</th>
            </tr>
            <tr>
                <td>parameters</td>
                <td>objects by parameter "5"</td>
            </tr>
            <tr>
                <td>0.72</td>
                <td>0.28</td>
            </tr>
        </table>
    </Fragment>
);


export default ConsistencyTable;
