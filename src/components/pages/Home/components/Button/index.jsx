import {h} from 'preact';

import BaseButton from 'components/common/Button';
import cn from 'utils/classnames';
import style from './style.scss';

const Button = ({className, onClick, children}) => (
    <BaseButton className={cn(style['button'], className)} onClick={onClick}>
        {children}
    </BaseButton>
);

export default Button;
