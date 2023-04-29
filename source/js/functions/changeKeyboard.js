export default (keyboard, action, clsName) => {
  if (keyboard.classList[action]) keyboard.classList[action](clsName);
};
