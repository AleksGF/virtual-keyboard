const rerender = (keys, state) => {
  const timeout = 200;
  const { keysCodes, keysElements, keysContents } = keys;
  const { currentLanguage } = state;

  const keysToChange = keysCodes
    .filter((code) => {
      const keyElement = keysElements[code];
      const keyContent = keysContents.get(keyElement);

      return !keyContent.iconContent && !keyElement.classList.contains('keyboard__key_func');
    })
    .map((code) => keysElements[code]);

  keysToChange.forEach((keyElement) => {
    const container = keyElement.querySelector('.key__container');
    container.style.opacity = '0';
  });

  setTimeout(() => {
    keysToChange.forEach((keyElement) => {
      const container = keyElement.querySelector('.key__container');
      const content = keysContents.get(keyElement)[currentLanguage];
      container.replaceChildren(...content);
      container.style.opacity = '1';
    });
  }, timeout);
};

export default rerender;
