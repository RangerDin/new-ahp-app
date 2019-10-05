import {h} from 'preact';

import Paragraph from 'components/pages/Home/components/Paragraph';
import style from './style.scss';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/useTranslation';
import LinkToPage from 'components/common/LinkToPage';

const MethodDescription = ({history}) => {
    const {t} = useContext(TranslationContext);

    return (
        <Paragraph className={style['method-description']}>
            {t('home.method-description.main-text')}{' '}
            <LinkToPage history={history} href='/about'>
                {t('home.method-description.read-more')}
            </LinkToPage>
            .
        </Paragraph>
    );
};

export default MethodDescription;
