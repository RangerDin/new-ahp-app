import {h} from 'preact';

import Label from 'components/common/Label';
import cn from 'utils/classnames';
import NameInput from '../NameInput';
import Button from '../Button';
import style from './style.scss';
import {TransitionGroup} from 'react-transition-group';
import {OpacityAnimation} from 'components/common/OpacityAnimation';

const getNameError = (
    name,
    emptyNameError,
    nonUniqueNameError,
    isNameDuplicated
) => {
    if (!name) {
        return emptyNameError;
    }

    if (isNameDuplicated(name)) {
        return nonUniqueNameError;
    }

    return '';
};

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
    emptyNameError,
    nonUniqueNameError,
    isNameDuplicated,
}) => (
    <div className={cn(className, style['object-names'])}>
        <Label className={style['object-names__label']}>{labelText}</Label>
        <TransitionGroup>
            {names.map((name, index) => (
                <OpacityAnimation key={index}>
                    <NameInput
                        value={name}
                        onChange={(event) =>
                            onNameChange(index, event.target.value)
                        }
                        placeholder={inputPlaceholder}
                        hasDeleteButton={hasDeleteButton}
                        onDelete={() => {
                            onNameDelete(index);
                        }}
                        error={getNameError(
                            name,
                            emptyNameError,
                            nonUniqueNameError,
                            isNameDuplicated
                        )}
                    />
                </OpacityAnimation>
            ))}
        </TransitionGroup>
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
