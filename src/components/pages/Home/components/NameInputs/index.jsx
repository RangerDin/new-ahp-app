import {h, Fragment} from 'preact';

import Label from 'components/common/Label';
import NameInput from '../NameInput';
import AddButton from '../AddButton';
import style from './style.scss';

const NameInputs = ({labelText, inputPlaceholder, addButtonText}) => (
    <Fragment>
        <Label className={style['object-names__label']}>
            {labelText}
            Enter the names of the objects you want to compare.
        </Label>
        <NameInput placeholder={inputPlaceholder} error="Name can't be empty" />
        <NameInput placeholder={inputPlaceholder} />
        <AddButton className={style['object-names__button']}>
            {addButtonText}
        </AddButton>
    </Fragment>
);

export default NameInputs;
