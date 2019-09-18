import {h} from 'preact';

import style from './style.scss';

export const OL = ({children}) => (
    <ol className={style['ordered-list']}>
        {children}
    </ol>
);
