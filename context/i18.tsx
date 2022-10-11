import React, { createContext, useContext } from 'react';

import es from '../locales/es';
import en from '../locales/en';
import fr from '../locales/fr';
import { useRouter } from 'next/router';

const I18NContext = createContext({});

type Props = {
  children: React.ReactNode;
};
const languages = { es, en, fr };

export const I18NProvider = ({ children }: Props) => {
  const { locale } = useRouter();

  const t = (key: string) => {
    return languages[locale][key];
  };

  return <I18NContext.Provider value={{ t }}>{children}</I18NContext.Provider>;
};

export function useI18N() {
  const context = useContext(I18NContext);
  if (context === undefined) {
    throw new Error('useI18N must be used within a I18NProvider');
  }
  return context;
}
