// generate user's event on virtual key when events happens on real keyboard
const onKeyDown = (key) => {
  const { keyElement } = key;
  const event = new Event('mousedown', { bubbles: true });
  keyElement.dispatchEvent(event);
};

const onKeyUp = (key) => {
  const { keyElement } = key;
  const event = new Event('mouseup', { bubbles: true });
  keyElement.dispatchEvent(event);
};

const realKeyboardHandler = (e, keyElementsMap) => {
  const { code } = e;
  const key = keyElementsMap[code];

  // prevent default except altKey, ctrlKey, shiftKey and func combinations
  if (key && (
    code !== 'ControlLeft'
    && code !== 'ControlRight'
    && code !== 'AltLeft'
    && code !== 'AltRight'
    && code !== 'ShiftLeft'
    && code !== 'ShiftRight'
    && code !== 'ArrowRight'
    && code !== 'ArrowLeft'
    && code !== 'ArrowUp'
    && code !== 'ArrowDown'
    && !e.ctrlKey
    && !e.metaKey
    && !e.altKey
  )) {
    e.preventDefault();
  }

  // do not react on repeated and user events
  if (key && e.type === 'keydown' && !e.repeat && e.isTrusted) {
    onKeyDown(key);
  }

  if (key && e.type === 'keyup') {
    onKeyUp(key);
  }
};

export default realKeyboardHandler;
