import {h} from 'preact';
import {Link} from 'preact-router/match';

import cn from 'utils/classnames';
import style from './style.scss';

const LinkToPage = ({history, href, className, children, activeClassName, isAlwaysActive}) => (
    <Link
        activeClassName={!isAlwaysActive && activeClassName}
        className={cn(className, style['link-to-page'])}
        href='#'
        onClick={(event) => {
            event.preventDefault();
            history.push(href);
        }}
    >
        {children}
    </Link>
);

export default LinkToPage;
