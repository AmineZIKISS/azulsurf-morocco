import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-margin-mobile">
      <h1 className="font-display-lg text-[120px] text-primary mb-4 leading-none">404</h1>
      <p className="font-body-lg text-on-surface-variant mb-8 text-center">{t('notFound.message')}</p>
      <Link 
        to="/" 
        className="bg-primary text-on-primary px-8 py-3 font-label-md uppercase tracking-wider rounded-lg hover-lift"
      >
        Return Home
      </Link>
    </div>
  );
}
