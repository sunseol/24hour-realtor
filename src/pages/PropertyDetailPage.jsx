import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Building2, Calendar, Check, Phone, Mail } from 'lucide-react';
import { SEO, Button, PageLoader, KakaoMap } from '../components/common';
import { PropertyGallery } from '../components/property';
import { useListing, useCompanyInfo } from '../hooks';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const { data: listing, loading } = useListing(id);
  const { data: companyInfo } = useCompanyInfo();

  if (loading) {
    return <PageLoader />;
  }

  if (!listing) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">매물을 찾을 수 없습니다</h1>
          <Link to="/properties">
            <Button variant="primary" icon={ArrowLeft}>
              매물 목록으로
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = listing.images?.length > 0 ? listing.images : (listing.image ? [listing.image] : []);

  return (
    <>
      <SEO 
        title={listing.title}
        description={listing.description || `${listing.title} - ${listing.type} ${listing.price}`}
        keywords={`${listing.title}, ${listing.type}, ${listing.tags?.join(', ')}`}
      />

      <div className="pt-20 pb-20 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/properties"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-amber-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            매물 목록으로
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {images.length > 0 ? (
                <PropertyGallery images={images} title={listing.title} />
              ) : (
                <div className={`aspect-video rounded-2xl bg-gradient-to-br ${listing.gradientClass || 'from-slate-700 to-slate-900'} flex items-center justify-center`}>
                  <Building2 className="w-20 h-20 text-white/30" />
                </div>
              )}

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`${listing.typeColor || 'bg-amber-500'} text-white text-sm font-bold px-3 py-1 rounded-full`}>
                    {listing.type}
                  </span>
                  {listing.tags?.map((tag, idx) => (
                    <span key={idx} className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                  {listing.title}
                </h1>

                <div className="flex items-center gap-2 text-slate-500 mb-6">
                  <MapPin className="w-4 h-4" />
                  {listing.address || '서울시 강남구'}
                </div>

                <div className="text-3xl font-bold text-amber-600 mb-8">
                  {listing.price}
                </div>

                <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl mb-8">
                  <div className="text-center">
                    <p className="text-slate-500 text-sm mb-1">면적</p>
                    <p className="font-semibold text-slate-900">{listing.specs?.split('·')[0]?.trim() || '-'}</p>
                  </div>
                  <div className="text-center border-x border-slate-200">
                    <p className="text-slate-500 text-sm mb-1">층수</p>
                    <p className="font-semibold text-slate-900">{listing.floor || '-'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-500 text-sm mb-1">준공</p>
                    <p className="font-semibold text-slate-900">{listing.built || '-'}</p>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-4">상세 정보</h2>
                <p className="text-slate-600 leading-relaxed mb-8">
                  {listing.description || '상세 정보가 준비 중입니다. 문의 주시면 자세한 안내를 받으실 수 있습니다.'}
                </p>

                {listing.features?.length > 0 && (
                  <>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">시설 및 특징</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {listing.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-slate-600">
                          <Check className="w-4 h-4 text-amber-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-4">위치</h2>
                <p className="text-slate-600 text-sm mb-4">{listing.address || '서울시 강남구'}</p>
                <KakaoMap 
                  address={listing.address || '서울시 강남구'}
                  markerTitle={listing.title}
                  className="aspect-video"
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 sticky top-24">
                <h3 className="text-lg font-bold text-slate-900 mb-4">상담 문의</h3>
                <p className="text-slate-600 text-sm mb-6">
                  이 매물에 대해 궁금한 점이 있으시면 언제든 문의해 주세요.
                </p>
                
                <div className="space-y-3">
                  <a href={`tel:${companyInfo.phone}`}>
                    <Button variant="primary" size="lg" icon={Phone} className="w-full">
                      전화 상담
                    </Button>
                  </a>
                  <Link to="/contact">
                    <Button variant="outline" size="lg" icon={Mail} className="w-full">
                      온라인 상담
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="text-sm text-slate-500 mb-2">담당자</p>
                  <p className="font-semibold text-slate-900">24시 코리아 부동산 전문 상담팀</p>
                  <p className="text-sm text-slate-500 mt-1">{companyInfo.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
