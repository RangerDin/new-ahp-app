import {h, Fragment} from 'preact';
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

export const Example = () => {
    const {
        state: {
            question,
            description,
            parameterNames,
            parameterComparisons,
            objectNames,
            objectComparisons,
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
        },
    } = useSolution();

    return (
        <div>
            <SectionHeader anchor={CONTENT_ANCHOR.EXAMPLE}>
                Example
            </SectionHeader>
            <Paragraph>
                An interactive example below shows how to use the analytic
                hierarchy process and this web application.
            </Paragraph>
            <Paragraph>
                Suppose an amateur car magazine "First Gear" decided to conduct
                its own research and decided to use the AHP and this web
                application in order to choose the best Italian mid-engine
                supercar worth less than 10.000 pounds.
            </Paragraph>
            <Paragraph>
                First of all, it is necessary to determine the goal:
            </Paragraph>
            <Question value={question} setValue={setQuestion} />
            <Paragraph>
                Details of the task should be placed in the description:
            </Paragraph>
            <Description value={description} setValue={setDescription} />
            <Paragraph>
                Next, you need to list all the compared objects. It is also
                necessary to list all the criteria by which these objects are
                evaluated:
            </Paragraph>
            <EntityNameInputs
                objectNames={objectNames}
                changeObjectName={changeObjectName}
                deleteObjectName={deleteObjectName}
                addObjectName={addObjectName}
                parameterNames={parameterNames}
                changeParameterName={changeParameterName}
                deleteParameterName={deleteParameterName}
                addParameterName={addParameterName}
            />
            <Paragraph>
                After all the criteria are listed, you can proceed to compare
                them. For pairwise object comparisons, one of two views can be
                used: "List of comparisons" or "Comparison matrix".
            </Paragraph>
            <Paragraph>
                "List of comparisons" is intended for those who are not yet very
                well versed in the analytic hierarchy process. In this view,
                each comparison is represented by a slider, changing the
                position of which, you can set the desired degree of preference
                for the left object to the right.
            </Paragraph>
            <Paragraph>
                "Comparison matrix" is intended for experts. And allows you to
                directly change the state of the matrix of pairwise comparisons.
                Each cell of the matrix, except for the cells of the main
                diagonal, can be edited. The cell can take values from the
                "Saati scale" and their reciprocals. After changing the value of
                the cell, the value of the "symmetric" cell of the matrix also
                changes.
            </Paragraph>
            {areParameterNamesFilled() && (
                <Comparisons
                    names={parameterNames}
                    comparisons={parameterComparisons}
                    setComparisons={setParameterComparison}
                    label='Compare parameters'
                />
            )}
            <Paragraph>
                Next, you need to perform pairwise comparisons of the objects
                for each of the criteria. Comparisons of the objects are made in
                a manner similar to the comparison of parameters.
            </Paragraph>
            {areParameterNamesFilled() &&
                areObjectNamesFilled() &&
                parameterNames.map((parameterName, parameterIndex) => (
                    <Fragment>
                        <Paragraph>
                            Comparison of objects by parameter {parameterName}.
                        </Paragraph>
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
                            label={`Compare objects by parameter ${parameterName}`}
                        />
                    </Fragment>
                ))}
            <Paragraph>
                The table below contains a list of objects and their respective
                priorities. Also, the object with the highest priority is
                displayed separately.
            </Paragraph>
            <Paragraph>
                Objects with the highest priority: Ferrari 308 GT4
            </Paragraph>
            {areParameterNamesFilled() && areObjectNamesFilled() && (
                <ResultPriorityTable
                    parameterComparisons={parameterComparisons}
                    objectComparisons={objectComparisons}
                    objectNames={objectNames}
                />
            )}
            <Paragraph>
                The table below contains a list of matrices and their
                corresponding consistency ratios. The consistency ratio shows
                how the comparisons in the matrix are consistent. If the
                consistency ratio of matrix is less than 0.1, the comparisons in
                this matrix are considered to be sufficiently consistent.
                Otherwise, comparisons in this matrix are considered to be
                inconsistent, and it is better to make them again.
            </Paragraph>
            {areParameterNamesFilled() && areObjectNamesFilled() && (
                <ConsistencyTable
                    parameterComparisons={parameterComparisons}
                    objectComparisons={objectComparisons}
                    parameterNames={parameterNames}
                />
            )}
            <Paragraph>
                Inconsistency arises, for example, with the following set of
                comparisons:
            </Paragraph>
            <UL>
                <LI>A is preferable to B;</LI>
                <LI>B is preferable to C;</LI>
                <LI>C is preferable to A.</LI>
            </UL>
            <Paragraph>
                It can be seen that the comparisons in the example above are
                illogical and contradict each other. If there are similar
                comparisons in the solution, the analytic hierarchy process
                produces an incorrect result.
            </Paragraph>
            <Paragraph>
                When all data is filled, the result is calculated and all
                matrices have acceptable consistency, the solution can be used.
            </Paragraph>
            <Paragraph>
                This completes the training example. Good luck with your
                decision-making!
            </Paragraph>
        </div>
    );
};
