import keys from './data/keys.js';
import getSettings from './functions/getSettings.js';
import setSettings from './functions/setSettings.js';
import getKeys from './functions/getKeys.js';
import render from './functions/render.js';
import rerender from './functions/rerender.js';
import realKeyboardHandler from './functions/realKeyboardHandler.js';
import virtualKeyboardHandler from './functions/virtualKeyboardHandler.js';
import textareaInputHandler from './functions/textareaInputHandler.js';

let { currentLang } = getSettings();
const { supportedLangs } = getSettings();
const { keyElements, keyElementsMap } = getKeys(keys, supportedLangs);
const { textareaElement, keyboardElement } = render(keyElements, currentLang);
const pressedKeys = new Set();
const isCaps = { current: false };

const realKeyPressHandler = (map) => (e) => {
  realKeyboardHandler(e, map);
};

const virtualKeyPressHandler = (map) => (e) => {
  virtualKeyboardHandler(e, map);
};

const setLanguage = (elements, map) => () => {
  let newLangIndex = supportedLangs.indexOf(currentLang) + 1;

  if (newLangIndex >= supportedLangs.length) newLangIndex = 0;

  const newLang = supportedLangs[newLangIndex];
  setSettings(newLang);
  currentLang = newLang;
  rerender(elements, map, currentLang);
};

const textareaHandler = (container, pressedKeysSet, changeLanguage) => (e) => {
  textareaInputHandler(e, container, currentLang, pressedKeysSet, isCaps, changeLanguage);
};

document.addEventListener('keydown', realKeyPressHandler(keyElementsMap));
document.addEventListener('keyup', realKeyPressHandler(keyElementsMap));
keyboardElement.addEventListener('mousedown', virtualKeyPressHandler(keyElementsMap));
document.addEventListener(
  'typing',
  textareaHandler(textareaElement, pressedKeys, setLanguage(keyElements, keyElementsMap)),
);
