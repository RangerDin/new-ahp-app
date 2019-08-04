import {saveAs} from 'file-saver';

export function saveAsFile(solution) {
    const solutionAsString = JSON.stringify(solution);
    const file = new Blob([solutionAsString], {
        type: 'application/json;charset=utf-8',
    });
    const fileName = `${solution.question}.json`;

    saveAs(file, fileName);
}
