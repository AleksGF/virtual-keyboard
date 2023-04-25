const textareaInputHandler = (e, container, currentLang, pressedKeys, changeLanguage) => {
  const textarea = container;

  if (e.data.type === 'keydown') {
    pressedKeys.add(e.data.code);
    const isShift = pressedKeys.has('ShiftRight') || pressedKeys.has('ShiftLeft');

    switch (e.data.code) {
      case 'ControlLeft':
      case 'AltLeft':
        if (pressedKeys.has('ControlLeft') && pressedKeys.has('AltLeft')) {
          changeLanguage();
        }
        break;

      default:
        textarea.value += isShift
          ? e.data.content[currentLang].shifted
          : e.data.content[currentLang].main;
    }
  }

  if (e.data.type === 'keyup') {
    pressedKeys.delete(e.data.code);
  }
};

export default textareaInputHandler;
