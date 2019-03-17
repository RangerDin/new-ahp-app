import {h} from 'preact';

import Logo from 'components/Logo';
import Menu from 'components/Menu';

import styles from './style.scss';

const Header = () => {
    return (
        <div className={styles.header}>
            <Logo />
            <Menu />
        </div>
    );
};

export default Header;
