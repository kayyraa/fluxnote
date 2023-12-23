import { SpeedInsights } from "@vercel/speed-insights/next"

document.addEventListener("DOMContentLoaded", function() {
    const textarea = document.getElementById("editor-input");
    const notename = document.getElementById("main");
    const charspan = document.getElementById("chars");
    const wordspan = document.getElementById("words");

    function refresh() {
        let text = textarea.value.trim();
        let charCount = text.length;
        let wordCount = text.split(/\s+/).filter(word => word !== '').length;

        charspan.innerHTML = charCount;
        wordspan.innerHTML = wordCount;
    }

    textarea.addEventListener("input", refresh);
    refresh();

    document.addEventListener("keydown", function(event) {
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
            event.preventDefault();
            save(textarea.value, notename.value);
        }
    });
});

function save(textToSave, fileName) {
    const blob = new Blob([textToSave], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.txt`;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}