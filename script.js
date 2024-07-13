import { SpeedInsights } from "@vercel/speed-insights/next"
import { inject } from "@vercel/analytics"
inject();

const textarea = document.getElementById("editor-input");
const notename = document.getElementById("main");
const charspan = document.getElementById("chars");
const wordspan = document.getElementById("words");

let OldWord = wordspan.innerHTML;
let OldChar = charspan.innerHTML;

function refresh() {
    let text = textarea.value.trim();
    let charCount = text.length;
    let wordCount = text.split(/\s+/).filter(word => word !== '').length;

    charspan.innerHTML = charCount;
    wordspan.innerHTML = wordCount;

    if (wordspan.innerHTML !== OldWord) {
        wordspan.style.scale = 1.25;
        OldWord = wordspan.innerHTML
        setTimeout(() => {
            wordspan.style.scale = 1;
        }, 125);
    }

    if (charspan.innerHTML !== OldChar) {
        charspan.style.scale = 1.25;
        OldChar = charspan.innerHTML
        setTimeout(() => {
            charspan.style.scale = 1;
        }, 125);
    }
}

textarea.addEventListener("input", refresh);
refresh();

document.addEventListener("keydown", function(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        save(textarea.value, notename.value);
    }
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
