const info = (texts) => {
  const addText = (text) => {
    const paragraph = document.createElement('p');
    paragraph.className = 'info__text';
    paragraph.innerText = text;

    return paragraph;
  }

  const infoElement = document.createElement('div');
  infoElement.className = 'info';

  texts.forEach((text) => {
    infoElement.append(addText(text));
  })

  return infoElement;
};

export default info;