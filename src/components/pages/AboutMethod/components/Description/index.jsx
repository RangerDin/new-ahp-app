import {h} from 'preact';
import {SectionHeader} from '../SectionHeader';
import {Paragraph} from '../Paragraph';
import {OL} from '../OL';
import {LI} from '../LI';
import {ComparisonMatrix} from 'components/common/ComparisonMatrix';
import {SaatiScale} from '../SaatiScale';
import {UL} from '../UL';
import {COMPARISON_VALUES} from 'constants/comparisons';
import {CONTENT_ANCHOR} from '../../constants/contents';
import {BibliographyLink} from '../BibliographyLink';
import {
    BIBLIOGRAPHY,
    BIBLIOGRAPHY_ANCHOR,
} from '../../constants/bibliography';

const EXAMPLE_OBJECT_NAME = ['Cat', 'Dog', 'Parrot'];

const EXAMPLE_MATRIX_OF_PAIRWISE_COMPARISONS = [
    [
        COMPARISON_VALUES.SAME_DEGREE_OF_PREFERENCE,
        COMPARISON_VALUES.SLIGHTLY_PREFERABLE,
        COMPARISON_VALUES.ABSOLUTELY_SUPERIOR,
    ],
    [
        COMPARISON_VALUES.SLIGHTLY_LESS_PREFERABLE,
        COMPARISON_VALUES.SAME_DEGREE_OF_PREFERENCE,
        COMPARISON_VALUES.MUCH_LESS_PREFERABLE,
    ],
    [
        COMPARISON_VALUES.ABSOLUTELY_INFERIOR,
        COMPARISON_VALUES.MUCH_PREFERABLE,
        COMPARISON_VALUES.SAME_DEGREE_OF_PREFERENCE,
    ],
];

export const Description = () => (
    <div>
        <SectionHeader anchor={CONTENT_ANCHOR.DESCRIPTION}>
            Description
        </SectionHeader>
        <Paragraph>
            The sequence of actions necessary to implement the method:
        </Paragraph>
        <OL>
            <LI>
                Representation of the problem in the form of a hierarchical
                structure.
                <Paragraph>
                    Representation of the problem in the form of a hierarchical
                    Usually three-level hierarchies are used to solve the
                    problem. At the highest level of the hierarchy is the goal -
                    the question to be answered. At the next level of the
                    hierarchy are the criteria by which objects (alternatives)
                    will be evaluated, the choice of one of which is needed to
                    achieve the goal. At the last level of the hierarchy are the
                    objects to be compared.
                </Paragraph>
            </LI>
            <LI>
                Performing the procedure of pairwise comparisons.
                <Paragraph>
                    At each level of the hierarchy, it is necessary to perform a
                    pairwise comparison of all elements of a given level with
                    respect to an element of a higher level. So the criteria are
                    compared with each other in relation to the goal, the
                    alternatives - in relation to each criterion.
                </Paragraph>
                <Paragraph>
                    Pairwise comparison is performed as follows. Of all the
                    objects at this hierarchy level, two objects are selected
                    and compared with each other using a special "Saati scale".
                    This scale has 9 divisions, each of which reflects the
                    degree of preference of one object to another. The table
                    below provides an explanation for each division of the
                    "Saati scale".
                </Paragraph>
                <SaatiScale />
                <Paragraph>
                    The results of pairwise comparisons of all objects are
                    written in the form of a matrix. An example of such a
                    matrix, containing the results of comparisons of three
                    objects, can be seen in the table below.
                </Paragraph>
                <ComparisonMatrix
                    disabled
                    names={EXAMPLE_OBJECT_NAME}
                    comparisons={EXAMPLE_MATRIX_OF_PAIRWISE_COMPARISONS}
                />
                <Paragraph>
                    Each cell of this matrix contains a value from the "Saati
                    scale", which shows how much the object corresponding to the
                    row of the matrix is preferable to the object corresponding
                    to the matrix column.
                </Paragraph>
                <Paragraph>
                    Inverse values, such as: "1/5", "1/9" - indicate that the
                    degree of preference should be read in the opposite
                    direction. Thus, the value "1/5" in the matrix means that
                    the degree of preference for the object corresponding to the
                    column, to the object corresponding to the row, is equal to
                    5.
                </Paragraph>
                <Paragraph>
                    Using the "Saaty scale" and the matrix of pairwise
                    comparisons presented above, one can find out that:
                </Paragraph>
                <UL>
                    <LI>"Object 1" is slightly preferable to "Object 2";</LI>
                    <LI>"Object 1" is absolutely superior to "Object 3";</LI>
                    <LI>"Object 3" is much preferable to "Object 2".</LI>
                </UL>
            </LI>
            <LI>
                The next step is to calculate the vectors of priorities and the
                consistency of the solution. After filling the matrix of
                pairwise comparisons, it is necessary to calculate the vector of
                priorities for the given matrix, in mathematical terms - the
                main eigenvector, which after normalization becomes a vector of
                priorities. You can also calculate the consistency of the
                comparison matrix, which shows how consistent the comparisons
                are.
                <Paragraph>
                    These comparisons and calculations set the priorities of the
                    elements of given hierarchy level relative to one element of
                    the next level. If there are more than two levels, different
                    priority vectors can be combined into priority matrices,
                    from which one final priority vector for the lower level is
                    determined.
                </Paragraph>
                <Paragraph>
                    All these calculations are performed automatically by this
                    web application. However, if you are interested in the
                    process of calculating the priority vector and consistency,
                    their detailed description is given in{' '}
                    <BibliographyLink
                        link={BIBLIOGRAPHY[BIBLIOGRAPHY_ANCHOR.DECISION_MAKING]}
                    />
                    .
                </Paragraph>
            </LI>
        </OL>
    </div>
);
