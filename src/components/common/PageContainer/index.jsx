import {h} from 'preact';

import style from './style.scss';

const PageContainer = ({children}) => (
    <div className={style['page-container']}>
        {children}
    </div>
);

export default PageContainer;
