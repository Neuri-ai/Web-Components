import Microphone from './components/microphone/index';
customElements.get('mic-button') || customElements.define('mic-button', Microphone);
