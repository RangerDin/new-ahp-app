import {h} from 'preact';

import LinkToPage from './components/LinkToPage';
import ActionButton from './components/ActionButton';
import LinkToLegal from './components/LinkToLegal';
import style from './style.scss';

const Menu = ({isOpen, history}) => (
    <div className={style['menu']} hidden={!isOpen}>
        <LinkToPage history={history} href='/' isAlwaysActive>New solution</LinkToPage>
        <LinkToPage history={history} href='/about'>About method</LinkToPage>
        <ActionButton>Light theme</ActionButton>
        <ActionButton>Русский язык</ActionButton>
        <LinkToLegal className={style.menu__link_author} href='#'>
            Made by htype
        </LinkToLegal>
        <LinkToLegal className={style.menu__link_icons8} href='#'>
            Icons by Icons8
        </LinkToLegal>
    </div>
);

export default Menu;
