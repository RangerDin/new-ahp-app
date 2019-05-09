import {h} from 'preact';
import {Link} from 'preact-router/match';

import cn from 'utils/classnames';

import style from '../style.scss';

const LinkToPage = ({href, isAlwaysActive, children}) => (
    <Link
        activeClassName={!isAlwaysActive && style.menu__link_current}
        href={href}
        className={cn(
            style.menu__item,
            style.menu__link,
            style.menu__link_page
        )}
    >
        {children}
    </Link>
);

export default LinkToPage;
