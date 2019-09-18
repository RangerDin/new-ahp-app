import {h} from 'preact';
import {SectionHeader} from '../SectionHeader';
import {Paragraph} from '../Paragraph';
import {UL} from '../UL';
import {LI} from '../LI';
import {CONTENT_ANCHOR} from '../../constants/contents';

export const Applications = () => (
    <div>
        <SectionHeader anchor={CONTENT_ANCHOR.APPLICATIONS}>
            Applications
        </SectionHeader>
        <Paragraph>
            The analytic hierarchy process is used to solve a wide range of
            problems. Initially, the method was developed to solve the problem
            of planning under unforeseen circumstances. Then the method was used
            to solve such problems as: energy distribution, investment in
            conditions of uncertainty, the fight against terrorism and many
            others.
        </Paragraph>
        <Paragraph>
            The analytic hierarchy process has the following advantages:
        </Paragraph>
        <UL>
            <LI>univarsality;</LI>
            <LI>
                taking into account the psychological aspects of decision
                making;
            </LI>
            <LI>
                there is formalized method that allows the consistency of both
                the obtained solution and the intermediate results obtained in a
                pairwise comparison.
            </LI>
        </UL>
        <Paragraph>
            The main drawback of the method is the need to obtain a large number
            of estimates from the expert. So, if you need to compare 7 objects
            based on 7 criteria, you will have to make 168 pairwise comparisons,
            which is quite a lot.
        </Paragraph>
    </div>
);
