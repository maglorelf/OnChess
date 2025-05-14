'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/languageContext';

export default function HeroSection() {
  const { t, language } = useLanguage();

  return (
    <section className="hero-gradient py-20 md:py-32">
      <div className="saas-container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
            <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
              {t('home.hero.label')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('home.hero.welcomePrefix')} <span className="text-primary">OnChess</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
              {t('home.hero.description')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/blog${language ? `?lang=${language}` : ''}`} className="btn-primary">
                {t('home.hero.exploreBlog')}
              </Link>
              <a className="btn-secondary" href="#latest-articles">
                {t('home.hero.latestArticles')}
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/logo-on-chess-text.png"
                  alt="OnChess Logo"
                  width={400}
                  height={400}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
