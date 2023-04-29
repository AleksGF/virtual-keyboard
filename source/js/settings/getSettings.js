const getSettings = () => {
  const supportedLanguages = ['en', 'ru', 'uk'];
  const savedLanguage = localStorage.getItem('keyLang');
  const currentLanguage = (
    supportedLanguages.includes(savedLanguage) && savedLanguage
  ) || supportedLanguages[0];

  return { currentLanguage, supportedLanguages };
};

export default getSettings;
