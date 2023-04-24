import keys from './data/keys.js';
import getKeys from './functions/getKeys.js';
import render from './functions/render.js';
import realKeyboardHandler from './functions/realKeyboardHandler.js';
import virtualKeyboardHandler from './functions/virtualKeyboardHandler.js';
import textareaInputHandler from './functions/textareaInputHandler.js';

const { keyElements, keyElementsMap } = getKeys(keys, ['en', 'ru', 'uk']);
const { textareaElement, keyboardElement } = render(keyElements, 'ru');
const pressedKeys = new Set();

const realKeyPressHandler = (map) => (e) => {
  realKeyboardHandler(e, map);
};

const virtualKeyPressHandler = (map) => (e) => {
  virtualKeyboardHandler(e, map);
};

const textareaHandler = (container, currentLang) => (e) => {
  textareaInputHandler(e, container, currentLang, pressedKeys);
};

textareaElement.focus();

document.addEventListener('keydown', realKeyPressHandler(keyElementsMap));
document.addEventListener('keyup', realKeyPressHandler(keyElementsMap));
textareaElement.addEventListener('blur', () => { textareaElement.focus(); });
keyboardElement.addEventListener('mousedown', virtualKeyPressHandler(keyElementsMap));
document.addEventListener('typing', textareaHandler(textareaElement, 'ru'));
