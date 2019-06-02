import {h} from 'preact';

import cn from 'utils/classnames';
import style from './style.scss';

const Select = ({className, placeholder, options, value, onChange}) => (
    <select
        className={cn(style.select, className)}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
    >
        <option className={style.option} disabled selected value=''>
            -- select at option --
        </option>
        {options.map(({label, value}) => (
            <option className={style.option} value={value}>
                {label}
            </option>
        ))}
    </select>
);

export default Select;
