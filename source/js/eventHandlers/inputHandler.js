const inputHandler = (e, components, keys, state, setLanguage) => {
  const { textarea, keyboard } = components;
  const { isCapsLock, pressedKeys, currentLanguage } = state;

  const getSelection = () => ({ start: textarea.selectionStart, end: textarea.selectionEnd });

  const moveCaret = (code) => {
    const event = new KeyboardEvent('keyDown', { composed: true, code });
    textarea.dispatchEvent(event);
  };

  const setNewValue = (value) => {
    let newValue;
    let newStart;
    const currentValue = textarea.value;
    const { start, end } = getSelection();

    switch (value) {
      case 'Delete':
        newValue = start === end
          ? currentValue.substring(0, start) + currentValue.substring(end + 1)
          : currentValue.substring(0, start) + currentValue.substring(end);
        newStart = start;
        break;

      case 'Backspace':
        newValue = start === end
          ? currentValue.substring(0, start - 1) + currentValue.substring(end)
          : currentValue.substring(0, start) + currentValue.substring(end);
        newStart = start - 1;
        break;

      default:
        newValue = currentValue.substring(0, start) + value + currentValue.substring(end);
        newStart = start + value.length;
    }

    if (newStart < 0) newStart = 0;

    textarea.value = newValue;
    textarea.selectionStart = newStart;
    textarea.selectionEnd = newStart;
  };

  if (e.data.type === 'keydown') {
    pressedKeys.add(e.data.code);
    const isShift = pressedKeys.has('ShiftRight') || pressedKeys.has('ShiftLeft');
    const isCtrl = pressedKeys.has('ControlRight') || pressedKeys.has('ControlLeft');
    const isAlt = pressedKeys.has('AltRight') || pressedKeys.has('AltLeft');

    switch (e.data.code) {
      case 'ShiftLeft':
      case 'ShiftRight':
        keyboard.classList.add('keyboard__container_shift');
        break;

      case 'ControlLeft':
      case 'AltLeft':
        if (pressedKeys.has('ControlLeft') && pressedKeys.has('AltLeft')) {
          setLanguage();
        }
        break;

      case 'CapsLock':
        isCapsLock.value = !isCapsLock.value;
        keyboard.classList.toggle('keyboard__container_caps');
        break;

      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowRight':
      case 'ArrowLeft':
        moveCaret(e.data.code);
        break;

      case 'Delete':
        setNewValue('Delete');
        break;

      case 'Backspace':
        setNewValue('Backspace');
        break;

      case 'Tab':
        setNewValue('\t');
        break;

      case 'Enter':
        setNewValue('\n');
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

          setNewValue(newValue);
        }
    }
  }

  if (e.data.type === 'keyup') {
    pressedKeys.delete(e.data.code);

    switch (e.data.code) {
      case 'ShiftLeft':
      case 'ShiftRight':
        if (!pressedKeys.has('ShiftRight') && !pressedKeys.has('ShiftLeft')) {
          keyboard.classList.remove('keyboard__container_shift');
        }
        break;

      default:
        break;
    }
  }
};

export default inputHandler;
