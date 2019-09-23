import {h} from 'preact';
import {SectionHeader} from '../SectionHeader';
import {Paragraph} from '../Paragraph';
import {CONTENT_ANCHOR} from '../../constants/contents';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/translation';

export const Definition = () => {
    const {t} = useContext(TranslationContext);

    return (
        <div>
            <SectionHeader anchor={CONTENT_ANCHOR.DEFINITION}>{t('about.definition.title')}</SectionHeader>
            <Paragraph>
                {t('about.definition.history')}
            </Paragraph>
            <Paragraph>
                {t('about.definition.main')}
            </Paragraph>
        </div>
    );
};
