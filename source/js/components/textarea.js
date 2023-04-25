const textarea = () => {
  const textareaElement = document.createElement('textarea');
  textareaElement.className = 'textarea';
  textareaElement.autofocus = true;

  return textareaElement;
};

export default textarea;
