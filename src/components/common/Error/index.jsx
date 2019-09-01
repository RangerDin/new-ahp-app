import {h} from 'preact';

import cn from 'utils/classnames';
import style from './style.scss';

const Error = ({children}) => (
    <div className={cn(style.error)}>{children}</div>
);

export default Error;
