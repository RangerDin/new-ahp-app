import {useState} from 'preact/hooks';
import {getCookie, setCookie} from './cookies';

const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';
const DEFAULT_THEME = LIGHT_THEME;
const COOKIE_THEME_KEY = 'theme';

const getThemeFromCookie = () => getCookie(COOKIE_THEME_KEY);

const setThemeToCookie = (theme) => {
    setCookie(COOKIE_THEME_KEY, theme);
};

const getThemeFromBrowser = () => {
    const preferableColorScheme = window.matchMedia('(prefers-color-scheme)').media;

    return preferableColorScheme === DARK_THEME ? DARK_THEME : LIGHT_THEME;
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

export const useTheme = (initialTheme) => {
    const [value, setValue] = useState(
        initialTheme || getThemeFromEnvironment()
    );
    const setTheme = (value) => {
        setValue(value);
        setThemeToCookie(value);
    };
    const toggleTheme = () => {
        setTheme(value === LIGHT_THEME ? DARK_THEME : LIGHT_THEME);
    };

    return {
        theme: value,
        setTheme,
        toggleTheme,
    };
};
