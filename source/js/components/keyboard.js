// Make icon for key
const getIcon = (link) => {
  const icon = document.createElement('object');
  icon.className = 'key__icon';
  icon.type = 'image/svg+xml';
  icon.data = link;

  return icon;
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

  return contentElement;
};

// Make one key
const getKeyElement = (key, lang) => {
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

  const keyOuterElement = document.createElement('div');
  keyOuterElement.className = 'key__outer';

  const keyContentContainer = document.createElement('div');
  keyContentContainer.className = 'key__container';

  // If key has icons - use it, else use text content
  if (key.displayContent.ico) {
    keyContentContainer.append(getIcon(key.displayContent.ico));
  } else if (key.classList.includes('key_mod')) {
    // If key has different content for main and shifted state - make two contents
    keyContentContainer.append(
      ...getDoubleContent(key.displayContent[lang].main, key.displayContent[lang].shifted),
    );
  } else {
    keyContentContainer.append(getSingleContent(key.displayContent[lang].shifted));
  }

  keyOuterElement.append(keyContentContainer);
  keyElement.append(keyOuterElement);

  return keyElement;
};

// Make board with all keys
const keyboard = (keys, lang) => {
  const keyboardElement = document.createElement('section');
  const keyElements = [];

  keyboardElement.className = 'keyboard__container';

  keys.forEach((key) => {
    keyElements.push(getKeyElement(key, lang));
  });

  keyboardElement.append(...keyElements);

  return keyboardElement;
};

export default keyboard;
