import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';

/**
 * `polymer3-example`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class Polymer3Example extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
      
      <iron-ajax
        id="api"
        url="http://localhost:8080/posts"
        method="GET"
        handle-as="json"
        on-response="handleResponse">
    </iron-ajax>
      
      <paper-input label="Question" id="question1"></paper-input>
      <paper-input label="Question" id="question2"></paper-input>
      <paper-input label="Question" id="question3"></paper-input>
      
      <paper-button id="button" on-click="buttonClicked">Click me !</paper-button>
      <ul>
     <template is="dom-repeat" items="[[elements]]">
      <li>[[item.message]]</li>
</template> 
</ul>
     
    `;
    }

    static get properties() {
        return {
            elements: {
                type: Array,
                value: []
            },
        };
    }

    buttonClicked() {
        const question1 = this.$.question1.value;
        const question2 = this.$.question2.value;
        const question3 = this.$.question3.value;

        const data = {question1, question2, question3};
        this.$.api.body = JSON.stringify(data);
        this.$.api.generateRequest();

        fetch('http://localhost:8080/posts')
            .then(response => response.json())
            .then(data => {
                // this.set('elements', data);
            });
    }

    handleResponse() {
        const response = this.$.api.lastResponse;
        this.set('elements', response);
    }
}

window.customElements.define('polymer3-example', Polymer3Example);
