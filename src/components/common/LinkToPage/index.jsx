import {h} from 'preact';
import {Link} from 'preact-router/match';

import cn from 'utils/classnames';
import style from './style.scss';

const LinkToPage = ({history, href, className, children, onClick, activeClassName, isAlwaysActive, state={}}) => (
    <Link
        activeClassName={!isAlwaysActive && activeClassName}
        className={cn(className, style['link-to-page'])}
        href='#'
        onClick={(event) => {
            event.preventDefault();
            onClick && onClick();

            const location = {
                state,
                pathname: href,
            };

            history.push(location);
        }}
    >
        {children}
    </Link>
);

export default LinkToPage;
