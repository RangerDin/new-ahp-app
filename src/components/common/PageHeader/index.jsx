import {h} from 'preact';

import cn from 'utils/classnames';
import style from './style.scss';

const PageHeader = ({className, children}) => (
    <h1 className={cn(className, style['page-header'])}>{children}</h1>
);

export default PageHeader;
