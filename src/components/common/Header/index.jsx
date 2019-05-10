import {h} from 'preact';

import Logo from 'components/common/Logo';
import MenuToggler from 'components/common/MenuToggler';
import Menu from 'components/common/Menu';

import styles from './style.scss';

const Header = ({isMenuOpen}) => {
    return (
        <header className={styles.header}>
            <Logo />
            <MenuToggler />
            <Menu isOpen />
        </header>
    );
};

export default Header;
