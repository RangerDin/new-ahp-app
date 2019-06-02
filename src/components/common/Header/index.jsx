import {h} from 'preact';
import {useState} from 'preact/hooks';

import Logo from 'components/common/Logo';
import MenuToggler from 'components/common/MenuToggler';
import Menu from 'components/common/Menu';

import styles from './style.scss';

const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <Logo />
            <MenuToggler
                isOpen={isMenuOpen}
                onClick={() => {
                    setMenuOpen(!isMenuOpen);
                }}
            />
            <Menu isOpen={isMenuOpen} />
        </header>
    );
};

export default Header;
