import {h, Fragment} from 'preact';

import Label from 'components/common/Label';
import style from './style.scss';

const ConsistencyTable = ({consistencies}) => (
    <Fragment>
        <Label className={style.result__header}>Consistency ratio</Label>
        <table className={style.result__table}>
            <tr>
                <th>Matrix</th>
                <th>Value</th>
            </tr>
            {
                consistencies.map(({name, value}) => (
                    <tr>
                        <td>{name}</td>
                        <td>{value}</td>
                    </tr>
                ))
            }
        </table>
    </Fragment>
);


export default ConsistencyTable;
