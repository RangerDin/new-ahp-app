import {h} from 'preact';
import {SectionHeader} from '../SectionHeader';
import {Paragraph} from '../Paragraph';
import {CONTENT_ANCHOR} from '../../constants/contents';

export const Definition = () => (
    <div>
        <SectionHeader anchor={CONTENT_ANCHOR.DEFINITION}>Definition</SectionHeader>
        <Paragraph>
            The analytic hierarchy process (AHP) is a mathematical tool for
            decision making. Developed by the American mathematician Thomas L.
            Saati in the 1970s.
        </Paragraph>
        <Paragraph>
            The method involves representing a complex problem as a hierarchy of
            goals, criteria, and alternatives. The solution of the problem is
            through a pairwise comparison procedure at each level of the
            hierarchy.
        </Paragraph>
    </div>
);
