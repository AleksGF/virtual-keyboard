const virtualKeyboardHandler = (e, map) => {
  const key = e.target.closest('.key');

  if (key) {
    const { code } = key.dataset;
    key.classList.add('pressed');

    const event = new Event('typing');
    event.data = { type: 'keydown', code, content: map[code].key.displayContent };
    document.dispatchEvent(event);

    const keyUpHandler = (keyElement) => function handler() {
      keyElement.classList.remove('pressed');

      const newEvent = new Event('typing');
      newEvent.data = { type: 'keyup', code: keyElement.dataset.code };
      document.dispatchEvent(newEvent);

      keyElement.removeEventListener('mouseup', handler);
    };

    key.addEventListener('mouseup', keyUpHandler(key));
  }
};

export default virtualKeyboardHandler;
