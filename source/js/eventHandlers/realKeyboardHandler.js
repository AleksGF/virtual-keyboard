// generate user's event on virtual key when events happens on real keyboard
const onKeyDown = (keyElement) => {
  const event = new Event('mousedown', { bubbles: true });
  keyElement.dispatchEvent(event);
};

const onKeyUp = (keyElement) => {
  const event = new Event('mouseup', { bubbles: true });
  keyElement.dispatchEvent(event);
};

const realKeyboardHandler = (e, keys) => {
  const { code } = e;
  const { keysElements } = keys;

  const keyElement = keysElements[code];

  // prevent default except altKey, ctrlKey, shiftKey and func combinations
  if (keyElement && (
    code !== 'ControlLeft'
    && code !== 'ControlRight'
    && code !== 'AltLeft'
    && code !== 'AltRight'
    && code !== 'ShiftLeft'
    && code !== 'ShiftRight'
    && !e.ctrlKey
    && !e.metaKey
    && !e.altKey
  )) {
    e.preventDefault();
  }

  // do not react on repeated and user events
  if (keyElement && e.type === 'keydown' && !e.repeat && e.isTrusted) {
    onKeyDown(keyElement);
  }

  if (keyElement && e.type === 'keyup') {
    onKeyUp(keyElement);
  }
};

export default realKeyboardHandler;
