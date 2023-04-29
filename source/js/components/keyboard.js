// Make board with all keys
const keyboard = (keys, state) => {
  const { keysCodes, keysElements, keysContents } = keys;
  const { currentLanguage } = state;

  const keyboardElement = document.createElement('section');
  keyboardElement.className = 'keyboard__container';

  keysCodes.forEach((code) => {
    const keyElement = keysElements[code];
    const keyContents = keysContents.get(keyElement);
    const container = keyElement.querySelector('.key__container');
    const content = keyContents.iconContent
      ? keyContents.iconContent
      : keyContents[currentLanguage];

    container.append(...content);
    keyboardElement.append(keyElement);
  });

  return keyboardElement;
};

export default keyboard;
