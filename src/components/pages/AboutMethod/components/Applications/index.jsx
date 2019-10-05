import {h} from 'preact';
import {SectionHeader} from '../SectionHeader';
import {Paragraph} from '../Paragraph';
import {UL} from '../UL';
import {LI} from '../LI';
import {CONTENT_ANCHOR} from '../../constants/contents';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/useTranslation';

export const Applications = () => {
    const {t} = useContext(TranslationContext);

    return (
        <div>
            <SectionHeader anchor={CONTENT_ANCHOR.APPLICATIONS}>
                {t('about.applications.title')}
            </SectionHeader>
            <Paragraph>
                {t('about.applications.problems')}
            </Paragraph>
            <Paragraph>
                {t('about.applications.advantages-title')}
            </Paragraph>
            <UL>
                <LI>
                    {t('about.applications.advantages-universality')}
                </LI>
                <LI>
                    {t('about.applications.advantages-psychological-aspects')}
                </LI>
                <LI>
                    {t('about.applications.advantages-consistency')}
                </LI>
            </UL>
            <Paragraph>
                {t('about.applications.advantages-drawbacks')}
            </Paragraph>
        </div>
    );
};
