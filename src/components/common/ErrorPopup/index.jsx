import {h} from 'preact';

import style from './style.scss';
import cn from 'utils/classnames';
import {OpacityAnimation} from '../OpacityAnimation';

export const ErrorPopup = ({isOpen, className, children}) => (
    <OpacityAnimation in={isOpen} unmountOnExit>
        <div
            className={cn(
                className,
                style['error-popup']
            )}
        >
            <div className={style['error-popup__container']}>
                <div className={style['error-popup__content']}>{children}</div>
            </div>
        </div>
    </OpacityAnimation>
);
