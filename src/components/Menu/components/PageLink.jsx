import {h} from 'preact';
import {Link} from 'preact-router';

import cn from 'utils/classnames';

import style from '../style.scss';

const PageLink = ({href, children}) => (
    <Link
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

export default PageLink;
