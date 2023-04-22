import keys from './data/keys.js';
import textarea from './components/textarea.js';
import keyboard from './components/keyboard.js';
import info from './components/information.js';

const body = document.querySelector('#root');
const wrapper = document.createElement('main');
wrapper.className = 'wrapper';
const keyboardWrapper = document.createElement('div');
const textareaElement = textarea();
const keyboardElement = keyboard(keys, 'en');
const infoElement = info([
  'Клавиатура создана в операционной системе Windows',
  'Для переключения языка комбинация: левыe ctrl + alt',
]);

keyboardWrapper.append(...[keyboardElement, infoElement]);
wrapper.append(...[textareaElement, keyboardWrapper]);
body.prepend(wrapper);