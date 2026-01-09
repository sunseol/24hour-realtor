import React, { useState, useMemo } from 'react';
import { SEO } from '../components/common';
import { PropertyCard, PropertyFilter } from '../components/property';
import { useListings } from '../hooks';
import { SkeletonCard } from '../components/common';

export default function PropertyListPage() {
  const { data: listings, loading } = useListings();
  const [filters, setFilters] = useState({
    district: '',
    type: 'all',
    priceRange: '',
    tag: ''
  });
  const [sortBy, setSortBy] = useState('newest');

  const filteredListings = useMemo(() => {
    let result = [...listings];

    if (filters.type && filters.type !== 'all') {
      result = result.filter(l => l.type === filters.type);
    }

    if (filters.district) {
      result = result.filter(l => 
        l.address?.includes(filters.district) || 
        l.title?.includes(filters.district)
      );
    }

    if (filters.tag) {
      result = result.filter(l => l.tags?.includes(filters.tag));
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
        return priceA - priceB;
      });
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
        return priceB - priceA;
      });
    }

    return result;
  }, [listings, filters, sortBy]);

  return (
    <>
      <SEO 
        title="매물 목록"
        description="24시 코리아 부동산의 프리미엄 매물을 확인하세요. 아파트, 빌라, 오피스텔 등 다양한 부동산 정보를 제공합니다."
        keywords="부동산 매물, 아파트 매매, 전세, 월세, 강남 부동산"
      />
      
      <div className="pt-24 pb-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            매물 목록
          </h1>
          <p className="text-slate-300">
            {filteredListings.length}개의 매물이 있습니다
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <PropertyFilter 
          filters={filters} 
          onFilterChange={setFilters}
          onSearch={() => {}}
        />

        <div className="flex justify-between items-center mb-6">
          <p className="text-slate-600">
            총 <span className="font-semibold text-slate-900">{filteredListings.length}</span>개
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          >
            <option value="newest">최신순</option>
            <option value="price-asc">가격 낮은순</option>
            <option value="price-desc">가격 높은순</option>
          </select>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredListings.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
            {filteredListings.map((listing) => (
              <PropertyCard key={listing._id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">조건에 맞는 매물이 없습니다.</p>
            <button
              onClick={() => setFilters({ district: '', type: 'all', priceRange: '', tag: '' })}
              className="mt-4 text-amber-600 hover:text-amber-700 font-medium"
            >
              필터 초기화
            </button>
          </div>
        )}
      </div>
    </>
  );
}
