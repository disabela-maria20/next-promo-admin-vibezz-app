'use client';

import { ReactNode, useEffect } from 'react';
import { addLocale, locale } from 'primereact/api';
import { all as locales } from 'primelocale';

export function PrimeReactI18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    addLocale('pt-BR', locales['pt-BR']);

    locale('pt-BR');
  }, []);

  return <>{children}</>;
}
