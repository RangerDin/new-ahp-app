import {h} from 'preact';

import cn from 'utils/classnames';
import style from '../style.scss';

export const Copyright = () => (
    <div className={cn(style['menu__copyright'], style['menu__item'])}>
        © 2019 htype
    </div>
);
