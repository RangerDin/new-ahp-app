const SOLUTION_PREFIX = 'solution_';

export function saveSolutionToLocalhost(solution) {
    localStorage.setItem(`${SOLUTION_PREFIX}${solution.question}`, JSON.stringify(solution));
}

export function loadSolutionFromLocalhost(question) {
    return JSON.parse(localStorage.getItem(`${SOLUTION_PREFIX}${question}`));
}

export function loadAllSolutionsFromLocalhost() {
    return Object.keys(localStorage)
        .filter((key) => key.startsWith(SOLUTION_PREFIX))
        .map((key) => JSON.parse(localStorage[key]));
}
