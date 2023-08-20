import Microphone from './components/microphone/index';
import Modal from './components/modal/index';
import Drawer from './components/drawer/index';

window.customElements.get('modal-popup') || window.customElements.define('modal-popup', Modal);
window.customElements.get('mic-button') || window.customElements.define('mic-button', Microphone);
window.customElements.get('drawer-component') || window.customElements.define('drawer-component', Drawer);
