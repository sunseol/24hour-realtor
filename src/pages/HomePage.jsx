import React from 'react';
import { Hero, Services, FeaturedProperties, ContactCTA } from '../components/home';
import { SEO } from '../components/common';
import { useScrollToHash } from '../hooks';

export default function HomePage() {
  useScrollToHash();

  return (
    <>
      <SEO 
        title="홈"
        description="24시간 언제나 고객님의 곁에서 최고의 부동산 서비스를 제공합니다. 전문 부동산 컨설턴트와 함께하세요."
        keywords="부동산, 아파트, 빌라, 전세, 월세, 매매, 강남, 서울"
      />
      <Hero />
      <Services />
      <FeaturedProperties />
      <ContactCTA />
    </>
  );
}
