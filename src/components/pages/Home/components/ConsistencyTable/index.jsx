import {h, Fragment} from 'preact';

import Label from 'components/common/Label';
import style from './style.scss';

const ConsistencyTable = () => (
    <Fragment>
        <Label className={style.result__header}>Consistency ratio</Label>
        <table className={style.result__table}>
            <tr>
                <th>Matrix</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>parameters</td>
                <td>0.28</td>
            </tr>
            <tr>
                <td>objects by parameter "Alpha romero hru 15 v8"</td>
                <td>0.72</td>
            </tr>
        </table>
    </Fragment>
);


export default ConsistencyTable;
