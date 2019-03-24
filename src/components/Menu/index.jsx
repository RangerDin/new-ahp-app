import {h} from 'preact';

import LinkToPage from './components/PageLink';
import ActionButton from './components/ActionButton';

import style from './style.scss';
import LegalLink from './components/LegalLink';

const Menu = () => (
    <div className={style['menu']}>
        <LinkToPage href='/'>New solution</LinkToPage>
        <LinkToPage href='/solutions/my'>My solutions</LinkToPage>
        <LinkToPage href='/about'>About method</LinkToPage>
        <ActionButton>Change theme to light</ActionButton>
        <ActionButton>Изменить язык на русский</ActionButton>
        <LegalLink className={style.menu__link_author} href='#'>
            Made by htype
        </LegalLink>
        <LegalLink className={style.menu__link_icons8} href='#'>
            Icons by Icons8
        </LegalLink>
    </div>
);

export default Menu;
