import {h} from 'preact';
import {Link} from 'preact-router/match';

import cn from 'utils/classnames';
import style from './style.scss';

const LinkToPage = ({href, className, children, activeClassName, isAlwaysActive}) => (
    <Link
        activeClassName={!isAlwaysActive && activeClassName}
        href={href}
        className={cn(className, style['link-to-page'])}
    >
        {children}
    </Link>
);

export default LinkToPage;
