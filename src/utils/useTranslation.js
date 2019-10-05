import {createContext} from 'preact';
import {LANGUAGE, DEFAULT_LANGUAGE} from 'constants/translation';
import englishDictionary from 'assets/dictionaries/english.json';
import russianDictionary from 'assets/dictionaries/russian.json';
import {useState} from 'preact/hooks';
import {setCookie, getCookie} from './cookies';

const COOKIE_TRANSLATION_KEY = 'translation';

const LANGUAGE_TO_DICTIONARY = {
    [LANGUAGE.ENGLISH]: englishDictionary,
    [LANGUAGE.RUSSIAN]: russianDictionary,
};

export const TranslationContext = createContext({
    language: LANGUAGE.ENGLISH,
    toggleLanguage: () => {},
    t: (word) => '',
});

const getLanguageFromCookie = () => getCookie(COOKIE_TRANSLATION_KEY);

const setLanguageToCookie = (value) => {
    setCookie(COOKIE_TRANSLATION_KEY, value);
};

const getLanguageFromEnvironment = () =>
    getLanguageFromCookie() || DEFAULT_LANGUAGE;

export const useTranslation = (initialLanguage) => {
    const [language, setValue] = useState(
        initialLanguage || getLanguageFromEnvironment()
    );

    const setLanguage = (value) => {
        setValue(value);
        setLanguageToCookie(value);
    };

    const toggleLanguage = () => {
        const newLanguage =
            language === LANGUAGE.ENGLISH ? LANGUAGE.RUSSIAN : LANGUAGE.ENGLISH;

        setLanguage(newLanguage);
    };

    const t = (translationKey) => {
        const dictionary = LANGUAGE_TO_DICTIONARY[language];
        const translation = dictionary[translationKey];

        if (!translation) {
            return `<There is no translation for key '${translationKey}' in language '${language}'>`;
        }

        return translation;
    };

    setLanguage(language);

    return {
        language,
        toggleLanguage,
        t,
    };
};
