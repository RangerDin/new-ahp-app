import {h} from 'preact';

import BaseLinkToPage from 'components/common/LinkToPage';
import cn from 'utils/classnames';

import style from '../style.scss';

const LinkToPage = ({href, isAlwaysActive, children}) => (
    <BaseLinkToPage
        activeClassName={!isAlwaysActive && style.menu__link_current}
        href={href}
        className={cn(
            style.menu__item,
            style.menu__link,
        )}
    >
        {children}
    </BaseLinkToPage>
);

export default LinkToPage;
