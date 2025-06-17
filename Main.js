const codeEditor = document.getElementById('code-editor');
const runButton = document.getElementById('run-button');
const refreshButton = document.getElementById('refresh-button');
const clearButton = document.getElementById('clear-button');
const formatButton = document.getElementById('format-button');
const previewFrame = document.getElementById('preview-frame');

runButton.addEventListener('click', () => {
    const code = codeEditor.value;
    const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    previewDoc.body.innerHTML = code;
});

refreshButton.addEventListener('click', () => {
    // Reload the preview frame
    previewFrame.contentWindow.location.reload();
});

clearButton.addEventListener('click', () => {
    codeEditor.value = '';
});

formatButton.addEventListener('click', () => {
    // Implement code formatting logic here
    // For simplicity, let's just format the code with indentation
    const code = codeEditor.value;
    const formattedCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    codeEditor.value = formattedCode;
});
