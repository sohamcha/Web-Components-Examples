window.onload = () => {

    console.log('done rendering');

    document.getElementById('btn1').onclick = (ev) => {
        console.log('Event Fired on :');
        console.log(ev.target);
        ev.stopPropagation();

        console.log("1st level parent for Blue and type: ");
        console.log(ev.target.parentElement);
        console.log(ev.target.parentNode.nodeName);
        console.log("2nd level parent for Blue and type: ");
        console.log(ev.target.parentElement.parentElement);
        console.log(ev.target.parentNode.parentNode.nodeName);

        ev.target.parentElement.parentElement.onclick = (ev) => {
            console.log('Click handler invoked on : ');
            console.log(ev.currentTarget);

        }
    };

};


class MyButton extends HTMLElement {
    constructor() {
        super();

        var root = this.attachShadow({ mode: "open" });
        var templateContent = document.getElementById('buttonComp').content.cloneNode(true);
        root.appendChild(templateContent);
        var buttonElem = this.querySelector('#slottedButton');
        if (buttonElem) {
            buttonElem.onclick = this.buttonHandler;
        }

        var inputElement = this.querySelector('#slottedText');
        if (inputElement) {
            inputElement.onkeyup = this.updateWC;
        }
    }

    buttonHandler() {

        console.log('Third Level Parent : ');
        console.log(this.parentNode.parentNode.parentNode);
        console.log('Actual Third Level Parent');
        console.log(this.parentNode.parentNode.parentNode.host);

    }

    updateWC() {

        var newVal = this.value;

        document.getElementById('wcMeter').wcDataObj = { 'data': newVal, 'count': newVal.length };
        document.getElementById('wcMeter').setAttribute('data-word-count', newVal.length);
        //    document.getElementById('wcMeter').logWCDataObj();

    }
}



class MyDiv extends HTMLElement {
    constructor() {
        super();

        var root = this.attachShadow({ mode: 'open' });
        var html = this.innerHTML;
        this.innerHTML = "";
        var div = document.createElement('div');
        div.id = 'myDiv';
        div.innerHTML = html;
        root.appendChild(div);
        root.appendChild(document.getElementById('para').content.cloneNode(true));


    }
}

class WordCount extends HTMLElement {

    static get observedAttributes() { return ['data-word-count']; }

    constructor() {
        super();
        var root = this.attachShadow({ mode: "open" });
        var content = document.getElementById('wc').content.cloneNode(true);
        var count = this.getAttribute('data-word-count');
        content.querySelector('p').innerText = 'Count : ' + count;
        root.appendChild(content);
    }

    attributeChangedCallback(name, oldValue, newValue) {

        console.log('Attribute updated : ' + name);

        this.shadowRoot.querySelector('p').innerText = 'Count : ' + newValue;

    }

    logWCDataObj() {
        console.log('Logging WC Object: ');
        console.log(this.wcDataObj);
    }

}


customElements.define('my-button', MyButton);
customElements.define('my-div', MyDiv);
customElements.define('word-count-meter', WordCount);

document.body.appendChild(document.getElementById('simpleTemplate').content.cloneNode(true));

window.onkeypress = (ev) => {
    console.log(ev.target);
};