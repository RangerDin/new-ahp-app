import {h} from 'preact';

import cn from 'utils/classnames';
import style from './style.scss';

const Label = ({className, children}) => (
    <label className={cn(className, style.label)}>{children}</label>
);

export default Label;
