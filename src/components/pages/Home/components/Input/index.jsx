import {h} from 'preact';

import BaseInput from 'components/common/Input';
import cn from 'utils/classnames';
import style from './style.scss';

const Input = ({className, placeholder, value, onChange}) => (
    <BaseInput
        placeholder={placeholder}
        className={cn(className, style.input)}
        value={value}
        onChange={onChange}
    />
);

export default Input;
