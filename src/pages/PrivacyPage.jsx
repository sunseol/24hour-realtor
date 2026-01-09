import React from 'react';
import { SEO, Card } from '../components/common';
import { useLegalPage } from '../hooks';
import { PortableText } from '@portabletext/react';
import { defaultPrivacyContent } from '../data/defaults';

const portableTextComponents = {
  block: {
    h2: ({children}) => <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{children}</h2>,
    h3: ({children}) => <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">{children}</h3>,
    h4: ({children}) => <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">{children}</h4>,
    normal: ({children}) => <p className="text-slate-600 mb-4 leading-relaxed">{children}</p>,
  },
  marks: {
    strong: ({children}) => <strong className="font-semibold text-slate-900">{children}</strong>,
    em: ({children}) => <em>{children}</em>,
    underline: ({children}) => <span className="underline">{children}</span>,
  },
};

export default function PrivacyPage() {
  const { data: pageData, loading } = useLegalPage('privacy');

  const content = pageData?.content || null;
  const title = pageData?.title || '개인정보처리방침';
  const lastUpdated = pageData?.lastUpdated || '2026-01-01';

  return (
    <>
      <SEO 
        title="개인정보처리방침"
        description="24시 코리아 부동산의 개인정보처리방침입니다."
      />

      <section className="pt-24 pb-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {title}
          </h1>
          <p className="text-slate-400">
            최종 수정일: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card padding="lg">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-slate-200 rounded w-1/3"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              </div>
            ) : content ? (
              <PortableText value={content} components={portableTextComponents} />
            ) : (
              <div className="prose prose-slate max-w-none">
                {defaultPrivacyContent.map((section, index) => (
                  <div key={index} className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">{section.title}</h2>
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-slate-600 mb-4 leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </section>
    </>
  );
}
