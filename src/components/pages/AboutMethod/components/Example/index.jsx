import {h} from 'preact';
import {SectionHeader} from '../SectionHeader';
import {CONTENT_ANCHOR} from '../../constants/contents';
import {Paragraph} from '../Paragraph';
import {useSolution} from 'utils/useSolution';
import Description from 'components/common/Description';
import Question from 'components/common/Question';
import {EntityNameInputs} from 'components/pages/Home/components/EntityNameInputs';
import Comparisons from 'components/common/Comparisons';
import ResultPriorityTable from 'components/pages/Home/components/ResultPriorityTable';
import ConsistencyTable from 'components/pages/Home/components/ConsistencyTable';
import {LI} from '../LI';
import {UL} from '../UL';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/useTranslation';
import {solution} from './solution';

export const Example = () => {
    const {
        state: {
            question,
            description,
            parameterNames,
            parameterComparisons,
            objectNames,
            objectComparisons,
            parameterMatrixConsistency,
            objectMatrixConsistencies,
            overallRanking,
        },
        operations: {
            setQuestion,
            setDescription,
            changeParameterName,
            changeObjectName,
            deleteParameterName,
            deleteObjectName,
            addParameterName,
            addObjectName,
            setParameterComparison,
            setObjectComparison,
            areObjectNamesFilled,
            areParameterNamesFilled,
            isObjectNameDuplicated,
            isParameterNameDuplicated,
            areObjectNamesDuplicated,
            areParameterNamesDuplicated,
        },
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
            <Question value={question} setValue={setQuestion} />
            <Paragraph>{t('about.example.description')}</Paragraph>
            <Description value={description} setValue={setDescription} />
            <Paragraph>{t('about.example.criteria')}</Paragraph>
            <EntityNameInputs
                objectNames={objectNames}
                changeObjectName={changeObjectName}
                deleteObjectName={deleteObjectName}
                addObjectName={addObjectName}
                parameterNames={parameterNames}
                changeParameterName={changeParameterName}
                deleteParameterName={deleteParameterName}
                addParameterName={addParameterName}
                isObjectNameDuplicated={isObjectNameDuplicated}
                isParameterNameDuplicated={isParameterNameDuplicated}
            />{' '}
            <Paragraph>{t('about.example.object-comparisons')}</Paragraph>
            <Paragraph>{t('about.example.comparison-control')}</Paragraph>
            <Paragraph>{t('about.example.comparison-matrix')}</Paragraph>
            <Comparisons
                names={parameterNames}
                comparisons={parameterComparisons}
                setComparisons={setParameterComparison}
                label={t('about.example.parameters-comparison-matrix-label')}
                errorText={t('home.parameters.comparisons.popup-error')}
                isErrorVisible={
                    !areParameterNamesFilled() || areParameterNamesDuplicated()
                }
            />
            <Paragraph>{t('about.example.pairwise-comparisons')}</Paragraph>
            {parameterNames.map((parameterName, parameterIndex) => (
                <Comparisons
                    names={objectNames}
                    comparisons={objectComparisons[parameterIndex]}
                    setComparisons={(index1, index2, value) =>
                        setObjectComparison(
                            parameterIndex,
                            index1,
                            index2,
                            value
                        )
                    }
                    label={`${t(
                        'about.example.comparison-of-objects-label'
                    )} ${parameterName}`}
                    errorText={t('home.objects.comparisons.popup-error')}
                    isErrorVisible={
                        !areObjectNamesFilled() ||
                        !areParameterNamesFilled() ||
                        areObjectNamesDuplicated()
                    }
                />
            ))}
            <Paragraph>
                {t('about.example.comparison-of-objects-matrix')}
            </Paragraph>
            <ResultPriorityTable
                overallRanking={overallRanking}
                objectNames={objectNames}
                error={
                    (!areObjectNamesFilled() ||
                        !areParameterNamesFilled() ||
                        areObjectNamesDuplicated() ||
                        areParameterNamesDuplicated()) &&
                    t('home.result.popup-error')
                }
            />
            <Paragraph>{t('about.example.consistency-ratio')}</Paragraph>
            <ConsistencyTable
                parameterMatrixConsistency={parameterMatrixConsistency}
                objectMatrixConsistencies={objectMatrixConsistencies}
                parameterNames={parameterNames}
                error={
                    (!areObjectNamesFilled() ||
                        !areParameterNamesFilled() ||
                        areObjectNamesDuplicated() ||
                        areParameterNamesDuplicated()) &&
                    t('home.consistency.popup-error')
                }
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
