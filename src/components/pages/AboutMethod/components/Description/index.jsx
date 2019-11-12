import {h} from 'preact';
import {SectionHeader} from '../SectionHeader';
import {Paragraph} from '../Paragraph';
import {OL} from '../OL';
import {LI} from '../LI';
import {ComparisonMatrix} from 'components/common/ComparisonMatrix';
import {SaatiScale} from '../SaatiScale';
import {UL} from '../UL';
import {COMPARISON_INDEX} from 'constants/comparisons';
import {CONTENT_ANCHOR} from '../../constants/contents';
import {BibliographyLink} from '../BibliographyLink';
import {
    BIBLIOGRAPHY,
    BIBLIOGRAPHY_ANCHOR,
} from '../../constants/bibliography';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/useTranslation';

const EXAMPLE_OBJECT_NAME = ['Object 1', 'Object 2', 'Object 3'];

const EXAMPLE_MATRIX_OF_PAIRWISE_COMPARISONS = [
    [
        COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE,
        COMPARISON_INDEX.SLIGHTLY_PREFERABLE,
        COMPARISON_INDEX.ABSOLUTELY_SUPERIOR,
    ],
    [
        COMPARISON_INDEX.SLIGHTLY_LESS_PREFERABLE,
        COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE,
        COMPARISON_INDEX.MUCH_LESS_PREFERABLE,
    ],
    [
        COMPARISON_INDEX.ABSOLUTELY_INFERIOR,
        COMPARISON_INDEX.MUCH_PREFERABLE,
        COMPARISON_INDEX.SAME_DEGREE_OF_PREFERENCE,
    ],
];

export const Description = () => {
    const {t} = useContext(TranslationContext);

    return (
        <div>
            <SectionHeader anchor={CONTENT_ANCHOR.DESCRIPTION}>
                {t('about.description.title')}
            </SectionHeader>
            <Paragraph>
                {t('about.description.sequence-of-actions')}
            </Paragraph>
            <OL>
                <LI>
                    {t('about.description.problem-as-hierarchical-structure-title')}
                    <Paragraph>
                        {t('about.description.problem-as-hierarchical-structure-main')}
                    </Paragraph>
                </LI>
                <LI>
                    {t('about.description.procedure-of-pairwise-comparisons-title')}
                    <Paragraph>
                        {t('about.description.procedure-of-pairwise-comparisons-hierarchy')}
                    </Paragraph>
                    <Paragraph>
                        {t('about.description.procedure-of-pairwise-comparisons-saati-scale')}
                    </Paragraph>
                    <SaatiScale />
                    <Paragraph>
                        {t('about.description.procedure-of-pairwise-comparisons-result')}
                    </Paragraph>
                    <ComparisonMatrix
                        disabled
                        names={EXAMPLE_OBJECT_NAME}
                        comparisons={EXAMPLE_MATRIX_OF_PAIRWISE_COMPARISONS}
                    />
                    <Paragraph>
                        {t('about.description.procedure-of-pairwise-comparisons-matrix')}
                    </Paragraph>
                    <Paragraph>
                        {t('about.description.procedure-of-pairwise-comparisons-inverse-values')}
                    </Paragraph>
                    <Paragraph>
                        {t('about.description.procedure-of-pairwise-comparisons-conclusions')}
                    </Paragraph>
                    <UL>
                        <LI>{t('about.description.procedure-of-pairwise-comparisons-conclusion-1')}</LI>
                        <LI>{t('about.description.procedure-of-pairwise-comparisons-conclusion-2')}</LI>
                        <LI>{t('about.description.procedure-of-pairwise-comparisons-conclusion-3')}</LI>
                    </UL> </LI>
                <LI>
                    {t('about.description.vectors-of-priorities-title')}
                    <Paragraph>
                        {t('about.description.vectors-of-priorities-main')}
                    </Paragraph>
                    <Paragraph>
                        {t('about.description.vectors-of-priorities-calculating')}{' '}
                        <BibliographyLink
                            link={BIBLIOGRAPHY[BIBLIOGRAPHY_ANCHOR.DECISION_MAKING]}
                        />
                    .
                    </Paragraph>
                </LI>
            </OL>
        </div>
    );
};
