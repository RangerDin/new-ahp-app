import {h} from 'preact';

import BaseSelect from 'components/common/Select';
import cn from 'utils/classnames';
import style from './style.scss';

const Select = ({className, value, options, onChange}) => (
    <BaseSelect
        className={cn(className, style.select)}
        value={value}
        options={options}
        onChange={onChange}
    />
);

export default Select;
