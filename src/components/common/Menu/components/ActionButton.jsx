import {h} from 'preact';

import cn from 'utils/classnames';
import Button from 'components/common/Button';

import style from '../style.scss';

export const ActionButton = ({children, onClick}) => (
    <Button
        className={cn(
            style.menu__item,
            style.menu__button,
            style.menu__button_action
        )}
        onClick={onClick}
    >
        {children}
    </Button>
);
