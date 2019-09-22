import {h} from 'preact';

import Link from 'components/common/Link';
import Paragraph from 'components/pages/Home/components/Paragraph';
import style from './style.scss';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/translation';

const MethodDescription = () => {
    const {t} = useContext(TranslationContext);

    return <Paragraph className={style['method-description']}>
        {t('home.method-description.main-text')}
        {' '}
        <Link href='#'>{t('home.method-description.read-more')}</Link>.
    </Paragraph>;
};

export default MethodDescription;
