const render = (body, components) => {
  const { textarea, keyboard, info } = components;

  const wrapper = document.createElement('main');
  wrapper.className = 'wrapper';

  const keyboardWrapper = document.createElement('div');
  keyboardWrapper.className = 'keyboard__wrapper';

  keyboardWrapper.append(...[keyboard, info]);
  wrapper.append(...[textarea, keyboardWrapper]);
  body.prepend(wrapper);

  textarea.addEventListener('blur', () => { textarea.focus(); });
};

export default render;
