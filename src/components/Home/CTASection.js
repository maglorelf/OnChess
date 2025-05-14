'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/languageContext';

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="saas-section gradient-bg text-white">
      <div className="saas-container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('home.ctaSection.title')}</h2>
          <p className="text-xl mb-8">{t('home.ctaSection.description')}</p>
          <Link
            href="/blog"
            className="inline-block bg-indigo-800 text-white font-bold py-3 px-8 rounded-full transition-all hover:shadow-lg hover:bg-indigo-700 hover:transform hover:translate-y-[-2px]"
          >
            {t('home.ctaSection.button')}
          </Link>
        </div>
      </div>
    </section>
  );
}
