import React from 'react';
import { Search } from 'lucide-react';
import { Input, Button } from '../common';
import { propertyTypes, seoulDistricts } from '../../data/defaults';

export default function PropertyFilter({ filters, onFilterChange, onSearch }) {
  const handleChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">지역</label>
          <select
            value={filters.district || ''}
            onChange={(e) => handleChange('district', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          >
            <option value="">전체 지역</option>
            {seoulDistricts.map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">거래유형</label>
          <select
            value={filters.type || 'all'}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          >
            {propertyTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">가격대</label>
          <select
            value={filters.priceRange || ''}
            onChange={(e) => handleChange('priceRange', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          >
            <option value="">전체 가격</option>
            <option value="0-3">3억 이하</option>
            <option value="3-5">3억 ~ 5억</option>
            <option value="5-10">5억 ~ 10억</option>
            <option value="10-20">10억 ~ 20억</option>
            <option value="20+">20억 이상</option>
          </select>
        </div>

        <div className="flex items-end">
          <Button 
            variant="primary" 
            size="lg" 
            icon={Search} 
            className="w-full"
            onClick={onSearch}
          >
            검색
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <span className="text-sm text-slate-500">인기 태그:</span>
        {['역세권', '신축', '남향', '풀옵션', '주차가능'].map((tag) => (
          <button
            key={tag}
            onClick={() => handleChange('tag', tag)}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
              filters.tag === tag
                ? 'bg-amber-500 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-amber-100'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
}
