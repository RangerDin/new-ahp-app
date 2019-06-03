import {h} from 'preact';

import PageHeader from 'components/common/PageHeader';
import style from './style.scss';

const Header = () => (
    <PageHeader className={style['header']}>
        Analytic Hierarchy Process
    </PageHeader>
);

export default Header;
