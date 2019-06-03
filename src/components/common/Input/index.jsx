import {h} from 'preact';

import cn from 'utils/classnames';
import style from './style.scss';

const Input = ({className, value, placeholder, onChange}) => (
    <input
        className={cn(className, style.input)}
        value={value}
        placeholder={placeholder}
        onInput={onChange}
    />
);

export default Input;
