import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Rooms() {
  const { t } = useTranslation();
  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
      <h2 className="text-3xl font-bold text-slate-900">{t('rooms.title')}</h2>
      <p className="text-slate-500 max-w-lg mx-auto">{t('rooms.subtitle')}</p>
    </div>
  );
}
