import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AdminPlaceholder({ title }) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-3xl shadow-xs border border-slate-200/60 p-8 min-h-[400px] flex items-center justify-center text-center">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          {t('adminPlaceholder.title', { name: title })}
        </h2>
        <p className="text-slate-500 text-sm">
          {t('adminPlaceholder.subtitle')}
        </p>
      </div>
    </div>
  );
}
