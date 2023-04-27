// Make icon for key
const getIcon = (src) => {
  const icon = document.createElement('img');
  icon.className = 'key__icon';
  icon.src = src;
  icon.alt = 'Key icon';

  return [icon];
};

// Make two divs for keys which will change when shift key pressed
const getDoubleContent = (mainContent, shiftedContent) => {
  const mainContentElement = document.createElement('div');
  mainContentElement.className = 'key__content_main';
  mainContentElement.innerText = mainContent;

  const shiftContentElement = document.createElement('div');
  shiftContentElement.className = 'key__content_shift';
  shiftContentElement.innerText = shiftedContent;

  return [mainContentElement, shiftContentElement];
};

// Make content for keys which will not change when shift key pressed
const getSingleContent = (content) => {
  const contentElement = document.createElement('div');
  contentElement.className = 'key__content';
  contentElement.innerText = content;

  return [contentElement];
};

const getKeyContent = (key, languages) => {
  const keyContent = {};

  // If key has icons - use it, else use text content
  if (key.displayContent.ico) {
    keyContent.iconContent = getIcon(key.displayContent.ico);
  } else if (key.classList.includes('key_mod')) {
    // If key has different content for main and shifted state - make two contents
    languages.forEach((language) => {
      keyContent[language] = getDoubleContent(
        key.displayContent[language].main.toUpperCase(),
        key.displayContent[language].shifted,
      );
    });
  } else {
    languages.forEach((language) => {
      keyContent[language] = getSingleContent(key.displayContent[language].main.toUpperCase());
    });
  }

  return keyContent;
};

// Make one key
const getKeyElement = (key) => {
  const keyElement = document.createElement('div');

  // Use different classNames for usual and func keys
  if (key.classList.includes('key_func')) {
    keyElement.className = `keyboard__key_func keyboard__key_width${key.width} key`;
  } else {
    keyElement.className = `keyboard__key_main keyboard__key_width${key.width} key`;
  }

  // Use classNames for different content position
  if (key.classList.includes('position_left')) {
    keyElement.classList.add('keyboard__key_left');
  }

  if (key.classList.includes('position_right')) {
    keyElement.classList.add('keyboard__key_right');
  }

  if (key.classList.includes('position_center')) {
    keyElement.classList.add('keyboard__key_center');
  }

  keyElement.dataset.code = key.code;

  const keyOuterElement = document.createElement('div');
  keyOuterElement.className = 'key__outer';

  const keyContentContainer = document.createElement('div');
  keyContentContainer.className = 'key__container';

  keyOuterElement.append(keyContentContainer);
  keyElement.append(keyOuterElement);

  return keyElement;
};

const getKeys = (keysData, state) => {
  const keysCodes = [];
  const keysElements = {};
  const keysContents = new WeakMap();
  const { supportedLanguages } = state;

  keysData.forEach((key) => {
    const keyElement = getKeyElement(key);
    keysCodes.push(key.code);
    keysElements[key.code] = keyElement;
    keysContents.set(keyElement, getKeyContent(key, supportedLanguages));
  });

  return {
    keys: keysData,
    keysCodes,
    keysElements,
    keysContents,
  };
};

export default getKeys;
