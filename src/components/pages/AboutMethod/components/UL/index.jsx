import {h} from 'preact';

import style from './style.scss';

export const UL = ({children}) => (
    <ul className={style['unordered-list']}>{children}</ul>
);
