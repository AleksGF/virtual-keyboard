const getNextLanguage = (state) => {
  const { currentLanguage, supportedLanguages } = state;

  let newLangIndex = supportedLanguages.indexOf(currentLanguage) + 1;

  if (newLangIndex >= supportedLanguages.length) newLangIndex = 0;

  return supportedLanguages[newLangIndex];
};

export default getNextLanguage;
