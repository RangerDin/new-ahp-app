import {h} from 'preact';

import cn from 'utils/classnames';
import style from './style.scss';

const Paragraph = ({className, children}) => (
    <p className={cn(className, style.paragraph)}>{children}</p>
);

export default Paragraph;
