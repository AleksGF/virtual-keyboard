export default (textarea, code) => {
  const event = new KeyboardEvent('keyDown', { composed: true, code });
  textarea.dispatchEvent(event);
};
