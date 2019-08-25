const onFileChange = (onLoad) => (event) => {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
        onLoad(e.target.result);
    };
    reader.readAsText(file);
};

export const loadSolutionFromFile = (onLoad) => {
    const input = document.createElement('input');

    input.type = 'file';
    input.accept = '.json';
    input.onchange = onFileChange(onLoad);
    input.click();
};

const TOP_SOLUTION_PROPERTIES = {
    question: 1,
    description: 1,
    objectNames: 1,
    parameterNames: 1,
    objectComparisons: 1,
    parameterNames: 1,
};

const isArrayString = (array) =>
    Array.isArray(array) && array.every((element) => typeof element === 'string');

const checkComparisons = (comparisons, length) =>
    Array.isArray(comparisons) &&
    comparisons.length === length &&
    comparisons.every((comparison) => isArrayString(comparison));

const checkCollectionOfComparisons = (
    collectionOfComparisons,
    length,
    comparisonsLength
) =>
    Array.isArray(collectionOfComparisons) &&
    collectionOfComparisons.length === length &&
    collectionOfComparisons.every((comparisons) =>
        checkComparisons(comparisons, comparisonsLength)
    );

export const checkFileFormat = (solution) => {
    if (
        typeof solution !== 'object' ||
        Object.keys(TOP_SOLUTION_PROPERTIES).length ===
            Object.keys(solution).length
    ) {
        return false;
    }

    if (
        Object.keys(TOP_SOLUTION_PROPERTIES).some((field) => !(field in solution))
    ) {
        return false;
    }

    if (
        typeof solution['question'] !== 'string' ||
        typeof solution['description'] !== 'string'
    ) {
        return false;
    }

    if (
        !isArrayString(solution['parameterNames']) ||
        !isArrayString(solution['objectNames'])
    ) {
        return false;
    }

    const numberOfParameters = solution['parameterNames'].length;
    const parameterComparisons = solution['parameterComparisons'];
    if (
        !checkComparisons(
            parameterComparisons,
            numberOfParameters
        )
    ) {
        return false;
    }

    const numberOfObjects = solution['objectNames'].length;
    const objectComparisons = solution['objectComparisons'];
    if (
        !checkCollectionOfComparisons(
            objectComparisons,
            numberOfParameters,
            numberOfObjects
        )
    ) {
        return false;
    }

    return true;
};
