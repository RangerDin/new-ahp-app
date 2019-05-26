import {h, Fragment} from 'preact';

import Label from 'components/common/Label';
import ComparisonSelect from '../ComparisonSelect';

import style from './style.scss';

const Comparisons = ({label}) => (
    <Fragment>
        <Label className={style.comparison__header}>{label}</Label>
        <div className={style.comparison__block}>
            <Label className={style.comparison__label}>parameter1</Label>
            <ComparisonSelect />
            <Label className={style.comparison__label}>parameter2</Label>
        </div>
        <div className={style.comparison__block}>
            <Label className={style.comparison__label}>parameter2</Label>
            <ComparisonSelect />
            <Label className={style.comparison__label}>parameter3</Label>
        </div>
    </Fragment>
);

export default Comparisons;
