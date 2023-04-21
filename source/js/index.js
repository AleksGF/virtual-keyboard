// eslint-disable-next-line import/extensions
import keys from './data/keys.js';

// eslint-disable-next-line import/extensions
import textarea from './components/textarea.js';
// eslint-disable-next-line import/extensions
import keyboard from './components/keyboard.js';
// eslint-disable-next-line import/extensions
import info from './components/information.js';

const body = document.querySelector('#root');
const textareaElement = textarea();
const keyboardElement = keyboard(keys, 'en');
const infoElement = info([
  'Клавиатура создана в операционной системе Windows',
  'Для переключения языка комбинация: левыe ctrl + alt',
]);

body.append(...[textareaElement, keyboardElement, infoElement]);
