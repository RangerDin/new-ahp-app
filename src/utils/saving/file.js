import {saveAs} from 'file-saver';

export function saveToFile(solutionState) {
    const solutionAsString = JSON.stringify({
        question: solutionState.question,
        description: solutionState.description,
        parameterNames: solutionState.parameterNames,
        parameterComparisons: solutionState.parameterComparisons,
        objectNames: solutionState.objectNames,
        objectComparisons: solutionState.objectComparisons,
    });
    const file = new Blob([solutionAsString], {
        type: 'application/json;charset=utf-8',
    });
    const fileName = `${solutionState.question}.json`;

    saveAs(file, fileName);
}
