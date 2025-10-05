import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  locale?: string;
  robots?: string;
  canonical?: string;
  structuredData?: any;
}

const SEO: React.FC<SEOProps> = ({
  title = 'AeroStory - Space Weather Storytelling Platform',
  description = 'Experience the cosmos through immersive storytelling. Discover solar flares, auroras, and space weather phenomena through interactive 3D adventures and educational content.',
  keywords = 'space weather, solar flares, auroras, space storytelling, NASA, astronomy, cosmic phenomena, space education, 3D space experiences',
  author = 'NASA Space Apps Team',
  image = '/favicon.ico',
  url = 'https://aerostory.space',
  type = 'website',
  siteName = 'AeroStory',
  locale = 'en_US',
  robots = 'index, follow',
  canonical,
  structuredData,
}) => {
  const fullTitle = title.includes('AeroStory') ? title : `${title} | AeroStory`;
  const fullUrl = canonical || `${url}${typeof window !== 'undefined' ? window.location.pathname : ''}`;
  
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    description: description,
    url: url,
    author: {
      '@type': 'Organization',
      name: author,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const mergedStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@AeroStory" />
      <meta name="twitter:creator" content="@NASA" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#667eea" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="AeroStory" />
      
      {/* PWA Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="AeroStory" />
      <meta name="msapplication-TileColor" content="#667eea" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Performance Hints */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      <link rel="dns-prefetch" href="//api.nasa.gov" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(mergedStructuredData)}
      </script>
      
      {/* Additional Meta Tags for SEO */}
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Security Headers - Note: X-Frame-Options should be set via HTTP headers, not meta tags */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      
      {/* Preload Critical Resources - Only if fonts are actually used */}
      {/* <link rel="preload" href="/fonts/Orbitron-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /> */}
      {/* <link rel="preload" href="/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /> */}
    </Helmet>
  );
};

// Specific SEO configurations for different pages
export const seoConfigs = {
  home: {
    title: 'AeroStory - Space Weather Storytelling Platform',
    description: 'Experience the cosmos through immersive storytelling. Discover solar flares, auroras, and space weather phenomena through interactive 3D adventures and educational content.',
    keywords: 'space weather, solar flares, auroras, space storytelling, NASA, astronomy, cosmic phenomena',
  },
  stories: {
    title: 'Cosmic Stories & Narratives - AeroStory',
    description: 'Discover incredible stories about space weather, cosmic phenomena, and astronomical adventures from enthusiasts around the world.',
    keywords: 'space stories, cosmic narratives, solar storm adventures, aurora experiences, space exploration',
  },
  sunnyAdventure: {
    title: 'Sunny the Solar Flare\'s Adventure - Interactive Space Story',
    description: 'Join Sunny, the cheerful solar flare, on a wild cosmic journey to Earth. Experience the effects of space weather through interactive storytelling.',
    keywords: 'solar flare adventure, space weather story, interactive space content, educational space content',
  },
  aeroverse: {
    title: 'AeroVerse - 3D Space Experience - AeroStory',
    description: 'Explore the cosmos in immersive 3D with AeroVerse. Navigate through space phenomena, solar storms, and cosmic events in real-time.',
    keywords: '3D space experience, immersive space, virtual space exploration, space simulation',
  },
};

export default SEO;
