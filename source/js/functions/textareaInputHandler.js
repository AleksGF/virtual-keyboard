const textareaInputHandler = (e, container, currentLang, pressedKeys) => {
  const textarea = container;

  if (e.data.type === 'keydown') {
    pressedKeys.add(e.data.code);
    const isShift = pressedKeys.has('ShiftRight') || pressedKeys.has('ShiftLeft');
    const currentContent = isShift
      ? e.data.content[currentLang].shifted
      : e.data.content[currentLang].main;

    textarea.value += currentContent;
  }

  if (e.data.type === 'keyup') {
    pressedKeys.delete(e.data.code);
  }
};

export default textareaInputHandler;
