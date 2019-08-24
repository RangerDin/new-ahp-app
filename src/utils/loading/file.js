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

export function loadSolutionFromFile(onLoad) {
    const input = document.createElement('input');

    input.type = 'file';
    input.accept = '.json';
    input.onchange = onFileChange(onLoad);
    input.click();
}
