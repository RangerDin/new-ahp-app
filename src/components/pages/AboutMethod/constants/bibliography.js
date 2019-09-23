export const BIBLIOGRAPHY_ANCHOR = {
    DECISION_MAKING: 'DECISION_MAKING',
    ABOUT_MEASURING_INTANGIBLE: 'ABOUT_MEASURING_INTANGIBLE',
};

export const BIBLIOGRAPHY_ANCHOR_PREFIX = 'bibliography-';

export const BIBLIOGRAPHY = {
    [BIBLIOGRAPHY_ANCHOR.DECISION_MAKING]: {
        order: 1,
        text: 'about.bibliography.literature-1',
    },
    [BIBLIOGRAPHY_ANCHOR.ABOUT_MEASURING_INTANGIBLE]: {
        order: 2,
        text: 'about.bibliography.literature-2',
    },
};

export const BIBLIOGRAPHY_LIST = Object.keys(BIBLIOGRAPHY)
    .map((item) => BIBLIOGRAPHY[item])
    .sort((item1, item2) => item1.order - item2.order);
