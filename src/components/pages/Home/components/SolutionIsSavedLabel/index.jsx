import {h} from 'preact';
import Paragraph from 'components/pages/Home/components/Paragraph';

import style from './style.scss';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/useTranslation';

const SolutionIsSavedLabel = () => {
    const {t} = useContext(TranslationContext);

    return <Paragraph className={style['solution-is-saved-label']}>
        {t('home.solution-saved-label')}
    </Paragraph>;
};

export default SolutionIsSavedLabel;
