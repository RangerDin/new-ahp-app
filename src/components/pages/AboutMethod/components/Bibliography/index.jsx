import {h} from 'preact';
import {Paragraph} from '../Paragraph';
import {OL} from '../OL';
import {SectionHeader} from '../SectionHeader';
import {CONTENT_ANCHOR} from '../../constants/contents';
import {BIBLIOGRAPHY_LIST, BIBLIOGRAPHY_ANCHOR_PREFIX} from '../../constants/bibliography';
import {LI} from '../LI';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/useTranslation';

export const Bibliography = () => {
    const {t} = useContext(TranslationContext);

    return (
        <div>
            <SectionHeader anchor={CONTENT_ANCHOR.BIBLIOGRAPHY}>
                {t('about.bibliography.title')}
            </SectionHeader>
            <Paragraph>
                {t('about.bibliography.literature-was-used')}
            </Paragraph>
            <OL>
                {BIBLIOGRAPHY_LIST.map((item) => (
                    <LI><a id={`${BIBLIOGRAPHY_ANCHOR_PREFIX}${item.order}`} />
                        {t(item.text)}
                    </LI>
                ))}
            </OL>
        </div>
    );
};
