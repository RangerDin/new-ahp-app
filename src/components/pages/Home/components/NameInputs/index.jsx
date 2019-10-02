import {h} from 'preact';

import Label from 'components/common/Label';
import cn from 'utils/classnames';
import NameInput from '../NameInput';
import Button from '../Button';
import style from './style.scss';
import {TransitionGroup} from 'react-transition-group';
import {OpacityAnimation} from 'components/common/OpacityAnimation';

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
}) => {
    const nameMap = names.reduce((map, name) => {
        map[name] = name in map ? map[name] + 1 : 1;

        return map;
    }, {});
    const getNameError = (name) => {
        if (!name) {
            return emptyNameError;
        }

        if (nameMap[name] > 1) {
            return nonUniqueNameError;
        }

        return '';
    };

    return (
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
                            error={getNameError(name)}
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
};

export default NameInputs;
