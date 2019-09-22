import {h} from 'preact';

import Button from '../Button';
import style from './style.scss';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/translation';

const SaveButton = ({onClick}) => {
    const {t} = useContext(TranslationContext);

    return (
        <Button className={style['save-button']} onClick={onClick}>
            {t('home.save-button')}
        </Button>
    );
};

export default SaveButton;
