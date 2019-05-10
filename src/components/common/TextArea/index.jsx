import {h} from 'preact';

import cn from 'utils/classnames';
import style from './style.scss';

const TextArea = ({className, value, placeholder, children, onChange}) => (
    <textarea
        className={cn(className, style.textarea)}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
    >
        {children}
    </textarea>
);

export default TextArea;
