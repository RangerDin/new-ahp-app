import {h} from 'preact';

import Button from '../Button';
import style from './style.scss';

const SaveButton = ({onClick}) => (
    <Button className={style['save-button']} onClick={onClick}>
        Save solution
    </Button>
);

export default SaveButton;
