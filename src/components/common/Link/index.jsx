import {h} from 'preact';

import cn from 'utils/classnames';
import style from './style.scss';

const Link = ({href, className, children}) => (
    <a href={href} className={cn(style.link, className)}>
        {children}
    </a>
);

export default Link;
