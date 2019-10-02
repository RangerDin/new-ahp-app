import {h} from 'preact';

import style from './style.scss';
import Label from 'components/common/Label';
import ComparisonSelect from 'components/common/ComparisonSelect';
import Error from 'components/common/Error';

export const Comparison = ({
    name1,
    name2,
    disabled,
    value,
    error,
    onChange,
}) => (
    <div className={style.comparison}>
        <Label title={name1} className={style.comparison__label}>
            {name1}
        </Label>
        <ComparisonSelect
            disabled={disabled}
            className={style.comparison__select}
            value={value}
            onChange={onChange}
        />
        <Label title={name2} className={style.comparison__label}>
            {name2}
        </Label>
        {error && <Error>{error}</Error>}
    </div>
);
