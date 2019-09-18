import {h} from 'preact';

import style from './style.scss';

export const LI = ({children}) => (
    <li className={style['list-item']}>{children}</li>
);
