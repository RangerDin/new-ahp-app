import {h, Fragment} from 'preact';

import Button from 'components/common/Button';
import cn from 'utils/classnames';
import Input from '../Input';
import Error from '../Error';
import style from './style.scss';

const NameInput = ({
    className,
    value,
    error,
    placeholder,
    hasDeleteButton,
    onChange,
    onDelete,
}) => (
    <Fragment>
        <Input
            className={cn(className, style.input)}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
        {error && <Error>{error}</Error>}
        {hasDeleteButton && (
            <Button onClick={onDelete} className={style['delete-button']}>
                delete
            </Button>
        )}
    </Fragment>
);

export default NameInput;
