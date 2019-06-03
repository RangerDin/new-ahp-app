import {h} from 'preact';

import Link from 'components/common/Link';
import cn from 'utils/classnames';
import style from './style.scss';

const Title = ({className, href, children}) => (
    <Link href={href} className={cn(className, style.title)}>{children}</Link>
);

export default Title;
