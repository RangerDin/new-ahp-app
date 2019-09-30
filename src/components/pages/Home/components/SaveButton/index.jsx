import {h} from 'preact';

import Button from '../Button';
import style from './style.scss';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/translation';
import {ErrorPopup} from 'components/common/ErrorPopup';

const SaveButton = ({error, onClick}) => {
    const {t} = useContext(TranslationContext);

    return (
        <div className={style['save-button']}>
            <Button onClick={onClick}>
                {t('home.save-button')}
            </Button>
            <ErrorPopup className={style['save-button__error-popup']} isOpen={error}>
                {error}
            </ErrorPopup>
        </div>
    );
};

export default SaveButton;
