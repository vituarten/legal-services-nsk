// Файл: src/components/SEOHead.tsx
import Head from 'next/head';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
}

export default function SEOHead({ title, description, canonical, noindex = false }: SEOHeadProps) {
  const siteName = 'Ваше название фирмы';
  const fullTitle = `${title} | ${siteName}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={`https://ваш-сайт.ру${canonical}`} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph теги для соцсетей (важно для шаринга) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {/* Укажите здесь путь к изображению для превью */}
      {/* <meta property="og:image" content="https://ваш-сайт.ру/og-image.jpg" /> */}

      {/* Можно добавить темы для Twitter, если нужно */}
    </Head>
  );
}