import {h} from 'preact';

import BaseLinkToPage from 'components/common/LinkToPage';
import cn from 'utils/classnames';

import style from '../style.scss';

export const LinkToPage = ({href, isAlwaysActive, children, history, state, onClick}) => (
    <BaseLinkToPage
        history={history}
        activeClassName={!isAlwaysActive && style.menu__link_current}
        href={href}
        state={state}
        onClick={onClick}
        className={cn(
            style.menu__item,
            style.menu__link,
        )}
    >
        {children}
    </BaseLinkToPage>
);
