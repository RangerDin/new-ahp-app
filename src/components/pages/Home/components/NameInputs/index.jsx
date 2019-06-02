import {h, Fragment} from 'preact';

import Label from 'components/common/Label';
import NameInput from '../NameInput';
import Button from '../Button';
import style from './style.scss';

const NameInputs = ({
    names,
    setNames,
    labelText,
    inputPlaceholder,
    hasDeleteButton,
    addButtonText,
}) => (
    <Fragment>
        <Label className={style['object-names__label']}>{labelText}</Label>
        {names.map((name, index) => (
            <NameInput
                keys={index}
                value={name}
                onChange={(event) =>
                    setNames([
                        ...names.slice(0, index),
                        event.target.value,
                        ...names.slice(index + 1),
                    ])
                }
                placeholder={inputPlaceholder}
                hasDeleteButton={hasDeleteButton}
                onDelete={() => {
                    setNames([
                        ...names.slice(0, index),
                        ...names.slice(index + 1),
                    ]);
                }}
                error={!name && 'Name can\'t be empty'}
            />
        ))}
        <Button
            className={style['object-names__button']}
            onClick={() => {
                setNames([...names, '']);
            }}
        >
            {addButtonText}
        </Button>
    </Fragment>
);

export default NameInputs;
