// Make board with all keys
const keyboard = (keyElements, lang) => {
  const keyboardElement = document.createElement('section');
  keyboardElement.className = 'keyboard__container';

  keyElements.forEach(({ keyElement, keyContent }) => {
    const container = keyElement.querySelector('.key__container');
    const content = keyContent.iconContent ? keyContent.iconContent : keyContent[lang];
    container.append(...content);
    keyboardElement.append(keyElement);
  });

  return keyboardElement;
};

export default keyboard;
