import {h} from 'preact';

import style from './style.scss';

export const Paragraph = ({children}) => (
    <p className={style['paragraph']}>{children}</p>
);
