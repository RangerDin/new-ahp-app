import {h} from 'preact';

import Button from '../Button';
import style from './style.scss';

const SaveButton = () => (
    <Button className={style['save-button']}>
        Save solution
    </Button>
);

export default SaveButton;
