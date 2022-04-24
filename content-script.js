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
            if (comment === '') return;
            let speech = new SpeechSynthesisUtterance(comment);
            speech.onend = () => {
                for (let i = lastBoundary; i < textarea.value.length; i++) {
                    let span = document.getElementById('letter' + i);
                    if (span.style.color !== 'red') {
                        span.style.color = 'green';
                    }
                }
                setTimeout(() => {
                    text.style.animationDuration = '.5s';
                    text.style.animationName = 'out';
                    text.onanimationend = () => {
                        shadow.remove();
                        save.disabled = false;
                    };
                }, 1000);
            };
            window.speechSynthesis.cancel();
            setTimeout(() => window.speechSynthesis.speak(speech), 1000);

            let container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.top = 0;
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.backgroundColor = 'rgba(0, 0, 0, .5)';
            container.style.zIndex = '999999999';
            container.style.margin = '0 auto';
            let text = document.createElement('div');
            text.style.margin = '3em auto';
            text.style.maxWidth = '50em';
            text.style.padding = '1em';
            text.style.fontFamily = getComputedStyle(document.body).fontFamily;
            text.style.backgroundColor = getComputedStyle(document.body).backgroundColor;
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

            let style = document.createElement('style');
            style.innerHTML = `
            @keyframes in {
                from {
                    transform: translateY(1000%);
                }

                to {
                    transform: none;
                }
            }

            @keyframes out {
                from {
                    transform: none;
                }

                to {
                    transform: translateY(-1000%);
                }
            }`;
            container.append(style);
            text.style.animationDuration = '.375s';
            text.style.animationName = 'in';

            container.id = 'listen-to-yourself';
            container.append(text);

            let shadow = document.createElement('div').attachShadow({ mode: 'closed' }).appendChild(container);
            document.body.append(shadow);
        };
        textbox.getElementsByClassName('usertext-buttons')[0].prepend(read);
    }
}
