import {h} from 'preact';

import Button from 'components/common/Button';

import style from './style.scss';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/useTranslation';

const MenuToggle = ({isOpen, onClick}) => {
    const {t} = useContext(TranslationContext);

    return (
        <Button onClick={onClick} className={style['menu-toggler']}>
            {isOpen ? t('menu.close') : t('menu.title')}
        </Button>
    );
};

export default MenuToggle;
