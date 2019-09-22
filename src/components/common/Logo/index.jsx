import {h} from 'preact';

import style from './style.scss';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/translation';

const Logo = () => {
    const {t} = useContext(TranslationContext);

    return <div className={style.logo}>{t('site.title')}</div>;
};

export default Logo;
