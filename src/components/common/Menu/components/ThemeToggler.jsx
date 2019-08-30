import {h} from 'preact';

import {capitalize} from 'utils/string';
import {ActionButton} from './ActionButton';

export const ThemeToggler = ({theme, onToggleTheme}) => (
    <ActionButton onClick={onToggleTheme}>{capitalize(theme)} theme</ActionButton>
);
