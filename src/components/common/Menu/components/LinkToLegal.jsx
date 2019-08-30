import {h} from 'preact';

import cn from 'utils/classnames';

import style from '../style.scss';

export const LinkToLegal = ({href, className, children}) => (
    <a
        className={cn(
            style.menu__item,
            style.menu__link,
            style.menu__link_legal,
            className
        )}
        href={href}
    >
        {children}
    </a>
);
