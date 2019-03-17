import {h} from 'preact';

import Button from 'components/Button';
import cn from 'utils/classnames';

import style from './style.scss';

const MenuMainLink = ({children}) => (
    <a href='#' className={cn(style['menu__link'], style['menu__link_main'])}>
        {children}
    </a>
);

const Menu = () => (
    <div className={style.menu}>
        <Button className={cn(style.menu__button, style.menu__button_main)}>
            Menu
        </Button>
        <div className={style['menu__container']}>
            <MenuMainLink>New solution</MenuMainLink>
            <MenuMainLink>My solutions</MenuMainLink>
            <MenuMainLink>About method</MenuMainLink>
            <Button
                className={cn(style.menu__button, style.menu__button_action)}
            >
                Change theme to light
            </Button>
            <Button
                className={cn(style.menu__button, style.menu__button_action)}
            >
                Изменить язык на русский
            </Button>
            <div className={style.menu__legal}>
                <a
                    className={cn(
                        style.menu__link,
                        style.menu__link_legal,
                        style.menu__link_author
                    )}
                    href='#'
                >
                    Made by htype
                </a>
                <a
                    className={cn(
                        style.menu__link,
                        style.menu__link_legal,
                        style.menu__link_icons8
                    )}
                    href='#'
                >
                    Icons by Icons8
                </a>
            </div>
        </div>
    </div>
);

export default Menu;
