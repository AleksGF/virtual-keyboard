const inputHandler = (e, components, keys, state, actions) => {
  const { textarea, keyboard } = components;
  const { isCapsLock, pressedKeys, currentLanguage } = state;
  const {
    setLanguage, moveCaret, setNewValue, changeKeyboard,
  } = actions;

  const changeKeyboardClsList = (action, clsName) => {
    changeKeyboard(keyboard, action, clsName);
  };

  if (e.data.type === 'keydown') {
    pressedKeys.add(e.data.code);
    const isShift = pressedKeys.has('ShiftRight') || pressedKeys.has('ShiftLeft');
    const isCtrl = pressedKeys.has('ControlRight') || pressedKeys.has('ControlLeft');
    const isAlt = pressedKeys.has('AltRight') || pressedKeys.has('AltLeft');

    switch (e.data.code) {
      case 'ShiftLeft':
      case 'ShiftRight':
        changeKeyboardClsList('add', 'keyboard__container_shift');
        break;

      case 'ControlLeft':
      case 'AltLeft':
        if (pressedKeys.has('ControlLeft') && pressedKeys.has('AltLeft')) {
          setLanguage();
        }
        break;

      case 'CapsLock':
        isCapsLock.value = !isCapsLock.value;
        changeKeyboardClsList('toggle', 'keyboard__container_caps');
        break;

      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowRight':
      case 'ArrowLeft':
        moveCaret(textarea, e.data.code);
        break;

      case 'Delete':
        setNewValue(textarea, 'Delete');
        break;

      case 'Backspace':
        setNewValue(textarea, 'Backspace');
        break;

      case 'Tab':
        setNewValue(textarea, '\t');
        break;

      case 'Enter':
        setNewValue(textarea, '\n');
        break;

      default:
        if (!isCtrl && !isAlt) {
          let newValue = isShift
            ? e.data.content[currentLanguage].shifted
            : e.data.content[currentLanguage].main;

          if (isCapsLock.value) {
            newValue = isShift
              ? newValue.toLowerCase()
              : newValue.toUpperCase();
          }

          setNewValue(textarea, newValue);
        }
    }
  }

  if (e.data.type === 'keyup') {
    pressedKeys.delete(e.data.code);

    switch (e.data.code) {
      case 'ShiftLeft':
      case 'ShiftRight':
        if (!pressedKeys.has('ShiftRight') && !pressedKeys.has('ShiftLeft')) {
          changeKeyboardClsList('remove', 'keyboard__container_shift');
        }
        break;

      default:
        break;
    }
  }
};

export default inputHandler;
