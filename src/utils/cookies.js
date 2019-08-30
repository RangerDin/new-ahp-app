export const getCookie = (name) => {
    const escapedName = name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1');
    const cookieRegExp = new RegExp(`(?:^|; )${escapedName}=([^;]*)`);
    const matches = document.cookie.match(cookieRegExp);

    return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name, value, additionalOptions) => {
    const options = {
        path: '/',
        ...additionalOptions,
    };
    const cookieAsignment =
        encodeURIComponent(name) + '=' + encodeURIComponent(value);
    const updatedPathOfCookie = Object.keys(options).reduce((cookie, key) => {
        const cookieWithAddedOption = `${cookie}; ${key}`;
        const optionValue = options[key];

        return optionValue !== true ?
            `${cookieWithAddedOption}=${optionValue}` : cookieWithAddedOption;
    }
    , cookieAsignment);

    document.cookie = updatedPathOfCookie;
};

export const deleteCookie = (name) => {
    setCookie(name, '', {
        'max-age': -1,
    });
};
