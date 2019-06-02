import {h, Fragment} from 'preact';

import Label from 'components/common/Label';
import NameInput from '../NameInput';
import Button from '../Button';
import style from './style.scss';

const NameInputs = ({
    names,
    labelText,
    inputPlaceholder,
    hasDeleteButton,
    addButtonText,
    onNameChange,
    onNameDelete,
    onNameAdd,
}) => (
    <Fragment>
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
        <Button
            className={style['object-names__button']}
            onClick={onNameAdd}
        >
            {addButtonText}
        </Button>
    </Fragment>
);

export default NameInputs;
