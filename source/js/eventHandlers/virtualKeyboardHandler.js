const virtualKeyboardHandler = (e, keys) => {
  const key = e.target.closest('.key');

  function keyUpHandler() {
    this.classList.remove('pressed');
    const keyCode = this.dataset.code;

    const newEvent = new Event('typing');
    newEvent.data = { type: 'keyup', code: keyCode };
    document.dispatchEvent(newEvent);

    this.removeEventListener('mouseup', keyUpHandler);
    this.removeEventListener('mouseleave', keyUpHandler);
  }

  if (key) {
    const { code } = key.dataset;
    const content = keys.keys.find((data) => data.code === code).displayContent;
    key.classList.add('pressed');

    class TypingEvent extends Event {
      constructor(data) {
        super('typing');
        this.data = { ...data };
      }
    }

    const event = new TypingEvent({ type: 'keydown', code, content });
    document.dispatchEvent(event);

    key.addEventListener('mouseup', keyUpHandler);
    key.addEventListener('mouseleave', keyUpHandler);
  }
};

export default virtualKeyboardHandler;
