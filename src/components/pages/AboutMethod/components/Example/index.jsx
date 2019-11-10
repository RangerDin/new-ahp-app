import {h} from 'preact';
import {SectionHeader} from '../SectionHeader';
import {CONTENT_ANCHOR} from '../../constants/contents';
import {Paragraph} from '../Paragraph';
import {useSolution} from 'utils/useSolution';
import Description from 'components/common/Description';
import Question from 'components/common/Question';
import {EntityNameInputs} from 'components/pages/Home/components/EntityNameInputs';
import ResultPriorityTable from 'components/pages/Home/components/ResultPriorityTable';
import ConsistencyTable from 'components/pages/Home/components/ConsistencyTable';
import {LI} from '../LI';
import {UL} from '../UL';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/useTranslation';
import {solution} from './solution';
import {ObjectComparisons} from 'components/common/ObjectComparisons';
import {ParameterComparisons} from 'components/common/ParameterComparisons';

export const Example = () => {
    const {
        state,
        errors,
        operations,
    } = useSolution(solution);
    const {t} = useContext(TranslationContext);

    return (
        <div>
            <SectionHeader anchor={CONTENT_ANCHOR.EXAMPLE}>
                {t('about.example.title')}
            </SectionHeader>
            <Paragraph>{t('about.example.preface')}</Paragraph>
            <Paragraph>{t('about.example.story')}</Paragraph>
            <Paragraph>{t('about.example.goal')}</Paragraph>
            <Question value={state.question} setValue={operations.setQuestion} />
            <Paragraph>{t('about.example.description')}</Paragraph>
            <Description value={state.description} setValue={operations.setDescription} />
            <Paragraph>{t('about.example.criteria')}</Paragraph>
            <EntityNameInputs
                objectNames={state.objectNames}
                changeObjectName={operations.changeObjectName}
                deleteObjectName={operations.deleteObjectName}
                addObjectName={operations.addObjectName}
                parameterNames={state.parameterNames}
                changeParameterName={operations.changeParameterName}
                deleteParameterName={operations.deleteParameterName}
                addParameterName={operations.addParameterName}
                isObjectNameDuplicated={errors.isObjectNameDuplicated}
                isParameterNameDuplicated={errors.isParameterNameDuplicated}
            />{' '}
            <Paragraph>{t('about.example.object-comparisons')}</Paragraph>
            <Paragraph>{t('about.example.comparison-control')}</Paragraph>
            <Paragraph>{t('about.example.comparison-matrix')}</Paragraph>
            <ParameterComparisons
                names={state.parameterNames}
                comparisons={state.parameterComparisons}
                setComparisons={operations.setParameterComparison}
                isErrorVisible={errors.parameterComparisons}
            />
            <Paragraph>{t('about.example.pairwise-comparisons')}</Paragraph>
            <ObjectComparisons
                parameterNames={state.parameterNames}
                objectNames={state.objectNames}
                objectComparisons={state.objectComparisons}
                setObjectComparison={operations.setObjectComparison}
                isErrorVisible={errors.objectComparisons}
            />
            <Paragraph>
                {t('about.example.comparison-of-objects-matrix')}
            </Paragraph>
            <ResultPriorityTable
                overallRanking={state.overallRanking}
                objectNames={state.objectNames}
                error={errors.result && t('home.result.popup-error')}
            />
            <Paragraph>{t('about.example.consistency-ratio')}</Paragraph>
            <ConsistencyTable
                parameterMatrixConsistency={state.parameterMatrixConsistency}
                objectMatrixConsistencies={state.objectMatrixConsistencies}
                parameterNames={state.parameterNames}
                error={errors.consistency && t('home.consistency.popup-error')}
            />
            <Paragraph>{t('about.example.inconsistency-example')}</Paragraph>
            <UL>
                <LI>
                    {t('about.example.inconsistency-example-description.1')}
                </LI>
                <LI>
                    {t('about.example.inconsistency-example-description.2')}
                </LI>
                <LI>
                    {t('about.example.inconsistency-example-description.3')}
                </LI>
            </UL>
            <Paragraph>{t('about.example.incorrect-result')}</Paragraph>
            <Paragraph>{t('about.example.solution-can-be-used')}</Paragraph>
            <Paragraph>{t('about.example.conclusion')}</Paragraph>
        </div>
    );
};
