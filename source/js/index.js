// ES6 introduced a new feature called modules
import keysData from './data/keys.js';
import getSettings from './settings/getSettings.js';
import setSettings from './settings/setSettings.js';
import textarea from './components/textarea.js';
import keyboard from './components/keyboard.js';
import information from './components/information.js';
import getKeys from './keys/getKeys.js';
import render from './functions/render.js';
import moveCaret from './functions/moveCaret.js';
import setNewValue from './functions/setNewValue.js';
import getNextLanguage from './settings/getNextLanguage.js';
import changeKeyboard from './functions/changeKeyboard.js';
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

// ES6 provides a feature known as Arrow Functions
const setLanguage = () => {
  const newLanguage = getNextLanguage(state);
  state.currentLanguage = newLanguage;
  setSettings(newLanguage);
  rerender(keys, state);
};

const actions = {
  setLanguage,
  moveCaret,
  setNewValue,
  changeKeyboard,
};

const realKeyPressHandler = (e) => {
  realKeyboardHandler(e, keys);
};

const virtualKeyPressHandler = (e) => {
  virtualKeyboardHandler(e, keys);
};

const textareaHandler = (e) => {
  inputHandler(e, components, keys, state, actions);
};

document.addEventListener('keydown', realKeyPressHandler);
document.addEventListener('keyup', realKeyPressHandler);
components.keyboard.addEventListener('mousedown', virtualKeyPressHandler);
document.addEventListener('typing', textareaHandler);
