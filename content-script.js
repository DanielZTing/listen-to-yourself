if (/reddit.com\/r\/.*\/comments/.test(window.location.href)) {
    for (let textbox of document.getElementsByClassName('usertext-edit')) {
        let read = document.createElement('button');
        read.type = 'button';
        read.innerText = 'read';
        let save = textbox.getElementsByClassName('save')[0];
        save.disabled = true;
        let textarea = textbox.getElementsByTagName('textarea')[0];
        textarea.oninput = () => save.disabled = true;
        read.onclick = () => {
            let comment = textarea.value;
            let speech = new SpeechSynthesisUtterance(comment);
            speech.onend = () => {
                if (textarea.value === comment) {
                    save.disabled = false;
                }
            };
            window.speechSynthesis.speak(speech);
        };
        textbox.getElementsByClassName('usertext-buttons')[0].prepend(read);
    }
}
