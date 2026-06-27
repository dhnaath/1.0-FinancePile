import { useState, useEffect } from 'react';

export type Language = 'id' | 'en' | 'ms' | 'zh';

export function useLanguage() {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('appLanguage') as Language) || 'id';
  });

  useEffect(() => {
    const handleLanguageChange = () => {
      setLang((localStorage.getItem('appLanguage') as Language) || 'id');
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  return lang;
}
