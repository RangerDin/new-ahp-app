import {h} from 'preact';
import {CSSTransition} from 'react-transition-group';

import style from './style.scss';

export const ANIMATION_TIMEOUT = 300;

export const animationClassNames = {
    enter: style['animation_enter'],
    enterActive: style['animation_enter-active'],
    exit: style['animation_exit'],
    exitActive: style['animation_exit-active'],
};

export const OpacityAnimation = ({
    children,
    timeout = ANIMATION_TIMEOUT,
    ...otherProps
}) =>
    (
        <CSSTransition
            timeout={timeout}
            classNames={animationClassNames}
            {...otherProps}
        >
            {children}
        </CSSTransition>
    );
