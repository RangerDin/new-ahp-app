import {createContext} from 'preact';
import {LANGUAGE} from 'constants/translation';
import englishDictionary from 'assets/dictionaries/english.json';
import russianDictionary from 'assets/dictionaries/russian.json';
import {useState} from 'preact/hooks';

const LANGUAGE_TO_DICTIONARY = {
    [LANGUAGE.ENGLISH]: englishDictionary,
    [LANGUAGE.RUSSIAN]: russianDictionary,
};

export const TranslationContext = createContext({
    language: LANGUAGE.ENGLISH,
    toggleLanguage: () => {},
    t: (word) => '',
});

export const useTranslation = () => {
    const [language, setLanguage] = useState(LANGUAGE.ENGLISH);

    const toggleLanguage = () => {
        const newLanguage = language === LANGUAGE.ENGLISH ? LANGUAGE.RUSSIAN : LANGUAGE.ENGLISH;

        setLanguage(
            newLanguage
        );
    };

    const t = (translationKey) => {
        const dictionary = LANGUAGE_TO_DICTIONARY[language];
        const translation = dictionary[translationKey];

        if (!translation) {
            return `<There is no translation for key '${translationKey}' in language '${language}'>`;
        }

        return translation;
    };

    return {
        language,
        toggleLanguage,
        t,
    };
};
