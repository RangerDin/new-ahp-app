import {h} from 'preact';
import Paragraph from 'components/pages/Home/components/Paragraph';

import style from './style.scss';

const SolutionIsSavedLabel = () => (
    <Paragraph className={style['solution-is-saved-label']}>
        Solution is saved
    </Paragraph>
);

export default SolutionIsSavedLabel;
