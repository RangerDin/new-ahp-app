import {h} from 'preact';

import BaseSelect from 'components/common/Select';
import cn from 'utils/classnames';
import style from './style.scss';

const Select = ({className, ...props}) => (
    <BaseSelect className={cn(className, style.select)} {...props} />
);

export default Select;
