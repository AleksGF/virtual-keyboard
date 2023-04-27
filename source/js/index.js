// ES6 introduced a new feature called modules
import keysData from './data/keys.js';
import getSettings from './functions/getSettings.js';
import setSettings from './functions/setSettings.js';
import textarea from './components/textarea.js';
import keyboard from './components/keyboard.js';
import information from './components/information.js';
import getKeys from './functions/getKeys.js';
import render from './functions/render.js';
import getNextLanguage from './functions/getNextLanguage.js';
import rerender from './functions/rerender.js';
import realKeyboardHandler from './eventHandlers/realKeyboardHandler.js';
import virtualKeyboardHandler from './eventHandlers/virtualKeyboardHandler.js';
import inputHandler from './eventHandlers/inputHandler.js';

// 'let' and 'const' Keywords are future of ES6
// Also it provides a spread operator
const state = {
  ...getSettings(),
  pressedKeys: new Set(),
  isCapsLock: { value: false },
};

const keys = getKeys(keysData, state);

const components = {
  textarea: textarea(),
  keyboard: keyboard(keys, state),
  info: information([
    'Клавиатура создана в операционной системе Windows',
    'Для переключения языка комбинация: left ctrl + left alt',
  ]),
};

const body = document.querySelector('#root');

render(body, components);

const setLanguage = () => {
  const newLanguage = getNextLanguage(state);
  state.currentLanguage = newLanguage;
  setSettings(newLanguage);
  rerender(keys, state);
};

const realKeyPressHandler = (e) => {
  realKeyboardHandler(e, keys);
};

const virtualKeyPressHandler = (e) => {
  virtualKeyboardHandler(e, keys);
};

const textareaHandler = (e) => {
  inputHandler(e, components, keys, state, setLanguage);
};

document.addEventListener('keydown', realKeyPressHandler);
document.addEventListener('keyup', realKeyPressHandler);
components.keyboard.addEventListener('mousedown', virtualKeyPressHandler);
document.addEventListener('typing', textareaHandler);
