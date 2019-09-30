import {h} from 'preact';

import style from './style.scss';
import cn from 'utils/classnames';

export const ErrorPopup = ({isOpen, className, children}) => (
    <div
        className={cn(
            className,
            style['error-popup'],
            !isOpen && style['error-popup_hidden']
        )}
    >
        <div className={style['error-popup__container']}>
            <div className={style['error-popup__content']}>{children}</div>
        </div>
    </div>
);
