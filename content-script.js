const HIGHLIGHTS = ['stupid', 'idiot', 'fuck', 'fucking', 'shit', 'retard', 'retarded', 'hate', 'crap', 'bullshit'];

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
                shadow.remove();
                save.disabled = false;
            };
            window.speechSynthesis.speak(speech);

            let container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.left = 0;
            container.style.top = 0;
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.zIndex = '999999999';
            container.style.margin = '0 auto';
            container.style.backgroundColor = getComputedStyle(document.body).backgroundColor;
            let text = document.createElement('div');
            text.style.margin = '3em auto';
            text.style.width = '90%';
            text.style.maxWidth = '50em';
            text.style.fontFamily = getComputedStyle(document.body).fontFamily;
            text.style.fontSize = 'large';

            let lastBoundary = 0;
            speech.onboundary = event => {
                for (let i = lastBoundary; i < event.charIndex; i++) {
                    let span = document.getElementById('letter' + i);
                    if (span.style.color !== 'red') {
                        span.style.color = 'green';
                    }
                }
                lastBoundary = event.charIndex;
            }

            function getWord(string, index) {
                let word = '';
                while (/\w/.test(string.charAt(index))) {
                    index--;
                }
                index++;
                while (/\w/.test(string.charAt(index))) {
                    word += string.charAt(index);
                    index++;
                }
                return word;
            }

            for (let i = 0; i < textarea.value.length; i++) {
                let span = document.createElement('span');
                span.id = 'letter' + i;
                span.innerText = textarea.value.charAt(i);
                if (HIGHLIGHTS.includes(getWord(textarea.value, i).toLowerCase())) {
                    span.style.color = 'red';
                }
                text.append(span);
            }

            container.append(text);
            let shadow = document.createElement('div').attachShadow({ mode: 'closed' }).appendChild(container);
            document.body.append(shadow);
        };
        textbox.getElementsByClassName('usertext-buttons')[0].prepend(read);
    }
}
