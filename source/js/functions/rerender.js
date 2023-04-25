const rerender = (keyElements, keyElementsMap, lang) => {
  const timeout = 200;

  const keysToChange = keyElements
    .filter((key) => !key.keyContent.iconContent
      && !key.keyElement.classList.contains('keyboard__key_func'));

  keysToChange.forEach((key) => {
    const element = key.keyElement.querySelector('.key__container');
    element.style.opacity = '0';
  });

  setTimeout(() => {
    keysToChange.forEach((key) => {
      const element = key.keyElement.querySelector('.key__container');
      element.replaceChildren(...key.keyContent[lang]);
      element.style.opacity = '1';
    });
  }, timeout);
};

export default rerender;
