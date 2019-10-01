import {h} from 'preact';

import Button from 'components/common/Button';
import cn from 'utils/classnames';
import Input from '../Input';
import Error from '../../../../common/Error';
import style from './style.scss';

const NameInput = ({
    className,
    inputClassName,
    value,
    error,
    placeholder,
    hasDeleteButton,
    onChange,
    onDelete,
}) => (
    <div className={cn(className, style['name-input'])}>
        <Input
            className={cn(
                inputClassName,
                style['name-input__input'],
                hasDeleteButton && style['name-input__input_with-delete-button']
            )}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
        <Error isVisible={!value}>{error}</Error>
        {hasDeleteButton && (
            <Button
                onClick={onDelete}
                className={style['name-input__delete-button']}
            >
                delete
            </Button>
        )}
    </div>
);

export default NameInput;
