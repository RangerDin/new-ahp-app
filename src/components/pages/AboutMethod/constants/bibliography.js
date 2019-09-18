export const BIBLIOGRAPHY_ANCHOR = {
    DECISION_MAKING: 'DECISION_MAKING',
    ABOUT_MEASURING_INTANGIBLE: 'ABOUT_MEASURING_INTANGIBLE',
};

export const BIBLIOGRAPHY_ANCHOR_PREFIX = 'bibliography-';

export const BIBLIOGRAPHY = {
    [BIBLIOGRAPHY_ANCHOR.DECISION_MAKING]: {
        order: 1,
        text:
            'Саати Т. Л. Принятие решений. Метод анализа иерархий. — М.: Радио и связь, 1989. — 316 с.',
    },
    [BIBLIOGRAPHY_ANCHOR.ABOUT_MEASURING_INTANGIBLE]: {
        order: 2,
        text: `Саати Т. Л. Об измерении неосязаемого. 
            Подход к относительным измерениям на основе 
            главного собственного вектора матрицы парных сравнений 
            // Журнал "Cloud Of Science". 2015. Т. 2. № 1`,
    },
};

export const BIBLIOGRAPHY_LIST = Object.keys(BIBLIOGRAPHY)
    .map((item) => BIBLIOGRAPHY[item])
    .sort((item1, item2) => item1.order - item2.order);
