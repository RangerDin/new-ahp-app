import {useState} from 'preact/hooks';
import {getCookie, setCookie} from './cookies';
import {
    DARK_THEME,
    LIGHT_THEME,
    THEME_COLORS,
    DEFAULT_THEME,
} from 'constants/themes';

const COOKIE_THEME_KEY = 'theme';

const getThemeFromCookie = () => getCookie(COOKIE_THEME_KEY);

const setThemeToCookie = (theme) => {
    setCookie(COOKIE_THEME_KEY, theme);
};

const getThemeFromBrowser = () => {
    const preferableColorScheme = window.matchMedia('(prefers-color-scheme)')
        .media;

    if ([DARK_THEME, LIGHT_THEME].includes(preferableColorScheme)) {
        return preferableColorScheme;
    }

    return null;
};

const getThemeFromEnvironment = () => {
    const themeFromCookie = getThemeFromCookie();

    if (themeFromCookie) {
        return themeFromCookie;
    }

    const themeFromBrowser = getThemeFromBrowser();

    if (themeFromBrowser) {
        return themeFromBrowser;
    }

    return DEFAULT_THEME;
};

const setCSSVariableName = (name, value) => {
    document.documentElement.style.setProperty(name, value);
};

const setThemeColorVariables = (value) => {
    const theme = THEME_COLORS[value];

    if (!theme) {
        return;
    }

    Object.keys(theme).map((colorVariableName) => {
        setCSSVariableName(colorVariableName, theme[colorVariableName]);
    });
};

export const useTheme = (initialTheme) => {
    const [value, setValue] = useState(
        initialTheme || getThemeFromEnvironment()
    );
    const setTheme = (value) => {
        setValue(value);
        setThemeToCookie(value);
        setThemeColorVariables(value);
    };
    const toggleTheme = () => {
        setTheme(value === LIGHT_THEME ? DARK_THEME : LIGHT_THEME);
    };

    setTheme(value);

    return {
        theme: value,
        setTheme,
        toggleTheme,
    };
};
