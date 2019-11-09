import {h} from 'preact';
import {useState, useCallback} from 'preact/hooks';

import Logo from 'components/common/Logo';
import MenuToggler from 'components/common/MenuToggler';
import Menu from 'components/common/Menu';

import styles from './style.scss';

const Header = ({history, theme, toggleTheme}) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const onMenuTogglerClick = useCallback(() => {
        setMenuOpen(!isMenuOpen);
    }, [isMenuOpen]);

    return (
        <header className={styles.header}>
            <Logo />
            <MenuToggler
                isOpen={isMenuOpen}
                onClick={onMenuTogglerClick}
            />
            <Menu
                theme={theme}
                toggleTheme={toggleTheme}
                history={history}
                isOpen={isMenuOpen}
            />
        </header>
    );
};

export default Header;
