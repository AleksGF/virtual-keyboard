import textarea from '../components/textarea.js';
import keyboard from '../components/keyboard.js';
import info from '../components/information.js';

const render = (keyElements, currentLang) => {
  const body = document.querySelector('#root');

  const wrapper = document.createElement('main');
  wrapper.className = 'wrapper';

  const textareaElement = textarea();

  const keyboardWrapper = document.createElement('div');
  keyboardWrapper.className = 'keyboard__wrapper';

  const keyboardElement = keyboard(keyElements, currentLang);

  const infoElement = info([
    'Клавиатура создана в операционной системе Windows',
    'Для переключения языка комбинация: левыe ctrl + alt',
  ]);

  keyboardWrapper.append(...[keyboardElement, infoElement]);
  wrapper.append(...[textareaElement, keyboardWrapper]);
  body.prepend(wrapper);

  return { textareaElement, keyboardElement };
};

export default render;
