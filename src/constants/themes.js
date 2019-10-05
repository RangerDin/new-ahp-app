export const LIGHT_THEME = 'menu.theme-dark';
export const DARK_THEME = 'menu.theme-light';
export const DEFAULT_THEME = DARK_THEME;

const LIGHT_THEME_COLORS = {
    'purple': '#3f51b5',
    'light-purple': '#5e99e2',
    'very-light-purple': '#e6e8f6',
    'light-grey': '#adc9d9',
    'grey': '#fafafa',
    'dark-grey': '#102027',
    'white': '#fff',
    'red': '#f00',
    'black': '#000',
    'light-blue': '#9ecaff',
    'very-light-blue': '#cee0f7',
    'transparent-white': 'rgba(230, 230, 230, 0.9)',
};

const DARK_THEME_COLORS = {
    'dark-purple': '#102027',
    'white': '#fff',
    'grey-blue': '#37474f',
    'green': '#00c853',
    'dark-green': '#009624',
    'very-dark-green': '#406b52',
    'light-grey-blue': '#62727b',
    'light-grey': '#adc9d9',
    'dark-grey': '#102027',
    'red': '#f00',
    'transparent-black': 'rgba(16, 32, 39, 0.9)',
};

const LIGHT_THEME_COLOR_VARIABLES = {
    '--color-active': LIGHT_THEME_COLORS['light-purple'],
    '--color-disabled': LIGHT_THEME_COLORS['very-light-blue'],
    '--color-cell-border': DARK_THEME_COLORS['dark-grey'],
    '--color-link': LIGHT_THEME_COLORS['very-light-purple'],
    '--color-link-current': LIGHT_THEME_COLORS['light-purple'],
    '--color-legal': LIGHT_THEME_COLORS['light-purple'],
    '--color-logo': LIGHT_THEME_COLORS['light-blue'],
    '--color-page-header': LIGHT_THEME_COLORS['black'],
    '--color-paragraph': LIGHT_THEME_COLORS['black'],
    '--color-placeholder': LIGHT_THEME_COLORS['light-grey'],
    '--color-placeholder-background': LIGHT_THEME_COLORS['white'],
    '--color-main-text': LIGHT_THEME_COLORS['black'],
    '--color-menu-background': LIGHT_THEME_COLORS['purple'],
    '--color-main-background': LIGHT_THEME_COLORS['grey'],
    '--color-error': LIGHT_THEME_COLORS['red'],
    '--color-error-popup': LIGHT_THEME_COLORS['transparent-white'],
};

const DARK_THEME_COLOR_VARIABLES = {
    '--color-active': DARK_THEME_COLORS['green'],
    '--color-disabled': DARK_THEME_COLORS['very-dark-green'],
    '--color-cell-border': DARK_THEME_COLORS['dark-grey'],
    '--color-link': DARK_THEME_COLORS['green'],
    '--color-link-current': DARK_THEME_COLORS['white'],
    '--color-legal': DARK_THEME_COLORS['dark-green'],
    '--color-logo': DARK_THEME_COLORS['white'],
    '--color-page-header': DARK_THEME_COLORS['white'],
    '--color-paragraph': DARK_THEME_COLORS['white'],
    '--color-placeholder': DARK_THEME_COLORS['light-grey'],
    '--color-placeholder-background': DARK_THEME_COLORS['light-grey-blue'],
    '--color-main-text': DARK_THEME_COLORS['white'],
    '--color-menu-background': DARK_THEME_COLORS['dark-purple'],
    '--color-main-background': DARK_THEME_COLORS['grey-blue'],
    '--color-error': DARK_THEME_COLORS['red'],
    '--color-error-popup': DARK_THEME_COLORS['transparent-black'],
};

export const THEME_COLORS = {
    [LIGHT_THEME]: LIGHT_THEME_COLOR_VARIABLES,
    [DARK_THEME]: DARK_THEME_COLOR_VARIABLES,
};
