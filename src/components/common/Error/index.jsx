import {h} from 'preact';

import cn from 'utils/classnames';
import style from './style.scss';

const Error = ({isVisible, children}) => (
    <div className={cn(style.error, !isVisible && style.error_hidden)}>{children}</div>
);

export default Error;
