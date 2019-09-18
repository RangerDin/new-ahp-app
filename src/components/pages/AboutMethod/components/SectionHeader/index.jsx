import {h, Fragment} from 'preact';

import style from './style.scss';

export const SectionHeader = ({anchor, children}) => (
    <Fragment>
        <a id={anchor} />
        <h3 className={style['section-header']}>{children}</h3>
    </Fragment>
);
