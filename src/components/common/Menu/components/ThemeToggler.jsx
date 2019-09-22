import {h} from 'preact';

import {ActionButton} from './ActionButton';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/translation';

export const ThemeToggler = ({theme, onToggleTheme}) => {
    const {t} = useContext(TranslationContext);

    return <ActionButton onClick={onToggleTheme}>{t(theme)}</ActionButton>;
};
