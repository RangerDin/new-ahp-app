import {h} from 'preact';

import BasePageHeader from 'components/common/PageHeader';
import style from './style.scss';

const Header = () => (
    <BasePageHeader className={style.header}>
        My solutions
    </BasePageHeader>
);

export default Header;
