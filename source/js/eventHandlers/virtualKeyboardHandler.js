const virtualKeyboardHandler = (e, keys) => {
  const key = e.target.closest('.key');

  class TypingEvent extends KeyboardEvent {
    constructor(data) {
      super('typing');
      this.data = { ...data };
    }
  }

  function keyUpHandler() {
    this.classList.remove('pressed');
    const { code } = this.dataset;

    const event = new TypingEvent({ type: 'keyup', code });
    document.dispatchEvent(event);

    this.removeEventListener('mouseup', keyUpHandler);
    this.removeEventListener('mouseleave', keyUpHandler);
  }

  if (key) {
    const { code } = key.dataset;
    const content = keys.keys.find((data) => data.code === code).displayContent;
    key.classList.add('pressed');

    const event = new TypingEvent({ type: 'keydown', code, content });
    document.dispatchEvent(event);

    key.addEventListener('mouseup', keyUpHandler);
    key.addEventListener('mouseleave', keyUpHandler);
  }
};

export default virtualKeyboardHandler;
