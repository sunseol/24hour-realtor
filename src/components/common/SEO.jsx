import { useEffect } from 'react';

export default function SEO({ 
  title, 
  description, 
  keywords,
  ogImage,
  ogType = 'website' 
}) {
  const siteName = '24시부동산';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = '24시간 언제나 고객님의 곁에서 최고의 부동산 서비스를 제공합니다.';

  useEffect(() => {
    document.title = fullTitle;

    const updateMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`) || 
                 document.querySelector(`meta[property="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        if (name.startsWith('og:')) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMeta('description', description || defaultDescription);
    if (keywords) updateMeta('keywords', keywords);
    
    updateMeta('og:title', fullTitle);
    updateMeta('og:description', description || defaultDescription);
    updateMeta('og:type', ogType);
    updateMeta('og:site_name', siteName);
    if (ogImage) updateMeta('og:image', ogImage);

    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description || defaultDescription);
    if (ogImage) updateMeta('twitter:image', ogImage);

  }, [fullTitle, description, keywords, ogImage, ogType]);

  return null;
}
