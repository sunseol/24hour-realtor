import React, { useState } from 'react';

const FeaturedProperties = () => {
  const [filter, setFilter] = useState('all');

  const properties = [
    {
      id: 1,
      type: "apartment",
      status: "매매",
      price: "35억 5천",
      title: "중구 을지로 프라임 타워",
      location: "서울시 중구 을지로",
      specs: "218㎡ (66평) · 방 4 · 욕실 2",
      tags: ["남향", "올수리", "로얄층"],
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      color: "from-blue-900 to-slate-800"
    },
    {
      id: 2,
      type: "office",
      status: "임대",
      price: "보 5억 / 월 450",
      title: "DDP 프라임 오피스",
      location: "서울시 중구 을지로 281",
      specs: "330㎡ (100평) · 15층",
      tags: ["역세권", "주차가능", "신축"],
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      color: "from-slate-800 to-gray-800"
    },
    {
      id: 3,
      type: "apartment",
      status: "전세",
      price: "12억",
      title: "동대문역 자이",
      location: "서울시 중구 장충동",
      specs: "84㎡ (34평) · 방 3 · 욕실 2",
      tags: ["풀옵션", "즉시입주", "한강뷰"],
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      color: "from-indigo-900 to-blue-900"
    }
  ];

  return (
    <section id="properties" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-gold-500 font-bold tracking-wider uppercase mb-3">Featured Properties</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">엄선된 프리미엄 매물</h3>
            <p className="text-gray-600">
              전문가가 직접 검증한 확실한 매물만을 소개합니다. 허위매물 없는 깨끗한 거래를 약속드립니다.
            </p>
          </div>
          
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${filter === 'all' ? 'bg-white shadow-sm text-primary-900' : 'text-gray-500 hover:text-gray-900'}`}
            >
              전체
            </button>
            <button 
              onClick={() => setFilter('apartment')}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${filter === 'apartment' ? 'bg-white shadow-sm text-primary-900' : 'text-gray-500 hover:text-gray-900'}`}
            >
              아파트/주택
            </button>
            <button 
              onClick={() => setFilter('office')}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${filter === 'office' ? 'bg-white shadow-sm text-primary-900' : 'text-gray-500 hover:text-gray-900'}`}
            >
              상가/오피스
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className={`h-64 bg-gradient-to-br ${property.color} relative overflow-hidden`}>
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/95 backdrop-blur-sm text-primary-900 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-lg">
                    {property.status}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
                  <p className="text-2xl font-bold">{property.price}</p>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                    <button className="bg-white text-primary-900 px-6 py-2 rounded-full font-bold shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        상세보기
                    </button>
                </div>
              </div>

              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-700 transition-colors">{property.title}</h4>
                <p className="text-gray-500 text-sm mb-4">{property.location}</p>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                    {property.specs}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {property.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
            <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white border border-gray-200 text-gray-900 font-bold rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all">
                매물 더보기
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
            </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
