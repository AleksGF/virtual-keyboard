export default (textarea, code) => {
// It should move caret. May be it will next time...
  const ta = textarea;
  switch (code) {
    case 'ArrowUp':
      ta.value += '\u2191';
      break;

    case 'ArrowDown':
      ta.value += '\u2193';
      break;

    case 'ArrowRight':
      ta.value += '\u2192';
      break;

    case 'ArrowLeft':
      ta.value += '\u2190';
      break;

    default:
      break;
  }
};
