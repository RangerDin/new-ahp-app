import {h} from 'preact';

import Logo from 'components/Logo';
import MenuToggler from 'components/MenuToggler';
import Menu from 'components/Menu';

import styles from './style.scss';

const Header = () => {
    return (
        <header className={styles.header}>
            <Logo />
            <MenuToggler />
            <Menu />
        </header>
    );
};

export default Header;
