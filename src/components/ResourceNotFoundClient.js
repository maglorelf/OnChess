'use client';

import { useLanguage } from '@/lib/languageContext';
import Link from 'next/link';

export default function ResourceNotFoundClient() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">{t('resources.resourceNotFound')}</h1>
        <p className="mb-8">{t('resources.resourceNotFoundDesc')}</p>
        <Link href="/resources" className="text-primary hover:underline">
          {t('resources.backToResources') || 'Back to resources'}
        </Link>
      </div>
    </div>
  );
}
