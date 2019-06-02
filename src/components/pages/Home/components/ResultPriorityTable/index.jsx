import {h, Fragment} from 'preact';

import Label from 'components/common/Label';
import style from './style.scss';

const ResultPriorityTable = ({priorities}) => (
    <Fragment>
        <Label className={style.result__header}>Result priority table</Label>
        <table className={style.result__table}>
            <tr>
                <th>Object</th>
                <th>Priorities</th>
            </tr>
            {
                priorities.map(({name, value}) => (
                    <tr>
                        <td>{name}</td>
                        <td>{value}</td>
                    </tr>
                ))
            }
        </table>
    </Fragment>
);

export default ResultPriorityTable;
