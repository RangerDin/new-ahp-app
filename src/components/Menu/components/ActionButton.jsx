import {h} from 'preact';

import cn from 'utils/classnames';
import Button from 'components/Button';

import style from '../style.scss';

const ActionButton = ({children, onClick}) => (
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

export default ActionButton;
