const getSettings = () => {
  const savedLang = localStorage.getItem('keyLang');
  const currentLang = savedLang || 'en';
  const supportedLangs = ['en', 'ru', 'uk'];

  return { currentLang, supportedLangs };
};

export default getSettings;
