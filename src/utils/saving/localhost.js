export function saveSolutionToLocalhost(solution) {
    localStorage.setItem(solution.question, JSON.stringify(solution));
}

export function loadSolutionFromLocalhost(question) {
    return JSON.parse(localStorage.getItem(question));
}
