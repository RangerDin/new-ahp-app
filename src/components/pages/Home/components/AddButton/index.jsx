import {h} from 'preact';

import Button from 'components/common/Button';
import cn from 'utils/classnames';
import style from './style.scss';

const AddButton = ({className, children}) => (
    <Button className={cn(style['add-button'], className)}>
        {children}
    </Button>
);

export default AddButton;
