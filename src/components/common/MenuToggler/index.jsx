import {h} from 'preact';

import Button from 'components/common/Button';

import style from './style.scss';

const MenuToggle = ({isOpen, onClick}) => (
    <Button onClick={onClick} className={style['menu-toggler']}>
        {isOpen ? 'Close' : 'Menu'}
    </Button>
);

export default MenuToggle;
