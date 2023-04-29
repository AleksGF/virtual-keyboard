const setNewValue = (container, value) => {
  let newValue;
  let newStart;
  const textarea = container;
  const [currentValue, start, end] = [
    textarea.value, textarea.selectionStart, textarea.selectionEnd,
  ];

  switch (value) {
    case 'Delete':
      newValue = start === end
        ? currentValue.substring(0, start) + currentValue.substring(end + 1)
        : currentValue.substring(0, start) + currentValue.substring(end);
      newStart = start;
      break;

    case 'Backspace':
      newValue = start === end
        ? currentValue.substring(0, start - 1) + currentValue.substring(end)
        : currentValue.substring(0, start) + currentValue.substring(end);
      newStart = start - 1;
      break;

    default:
      newValue = currentValue.substring(0, start) + value + currentValue.substring(end);
      newStart = start + value.length;
  }

  if (newStart < 0) newStart = 0;

  textarea.value = newValue;
  textarea.selectionStart = newStart;
  textarea.selectionEnd = newStart;
};

export default setNewValue;
