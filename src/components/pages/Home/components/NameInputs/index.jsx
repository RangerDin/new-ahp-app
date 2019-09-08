import {h} from 'preact';

import Label from 'components/common/Label';
import cn from 'utils/classnames';
import NameInput from '../NameInput';
import Button from '../Button';
import style from './style.scss';

const NameInputs = ({
    className,
    names,
    labelText,
    inputPlaceholder,
    hasDeleteButton,
    hasAddButton,
    addButtonText,
    onNameChange,
    onNameDelete,
    onNameAdd,
}) => (
    <div className={cn(className, style['object-names'])}>
        <Label className={style['object-names__label']}>{labelText}</Label>
        {names.map((name, index) => (
            <NameInput
                keys={index}
                value={name}
                onChange={(event) => onNameChange(index, event.target.value)}
                placeholder={inputPlaceholder}
                hasDeleteButton={hasDeleteButton}
                onDelete={() => {
                    onNameDelete(index);
                }}
                error={!name && 'Name can\'t be empty'}
            />
        ))}
        {hasAddButton && (
            <Button
                className={style['object-names__button']}
                onClick={onNameAdd}
            >
                {addButtonText}
            </Button>
        )}
    </div>
);

export default NameInputs;
