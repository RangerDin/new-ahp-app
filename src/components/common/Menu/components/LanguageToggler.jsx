import {h} from 'preact';
import {ActionButton} from './ActionButton';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/translation';
import {LANGUAGE_LABEL} from 'constants/translation';

export const LanguageToggler = () => {
    const translation = useContext(TranslationContext);

    return (
        <ActionButton onClick={translation.toggleLanguage}>
            {LANGUAGE_LABEL[translation.language]}
        </ActionButton>
    );
};
