const getSettings = () => {
  const supportedLanguages = ['en', 'ru', 'uk'];
  const savedLanguage = localStorage.getItem('keyLang');
  const currentLanguage = (savedLanguage) || 'en';

  return { currentLanguage, supportedLanguages };
};

export default getSettings;
