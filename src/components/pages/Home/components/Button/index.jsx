import {h} from 'preact';

import BaseButton from 'components/common/Button';
import cn from 'utils/classnames';
import style from './style.scss';

const Button = ({className, children}) => (
    <BaseButton className={cn(style['button'], className)}>
        {children}
    </BaseButton>
);

export default Button;
