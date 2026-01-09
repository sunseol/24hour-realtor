import React from 'react';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

export default function PropertyCard({ listing }) {
  const imageUrl = listing.image;
  const hasValidImage = imageUrl && typeof imageUrl === 'string' && imageUrl.startsWith('http');

  return (
    <Link
      to={`/properties/${listing._id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 block"
    >
      <div className={`h-56 bg-gradient-to-br ${listing.gradientClass || 'from-slate-700 to-slate-900'} relative overflow-hidden`}>
        {hasValidImage && (
          <img
            src={imageUrl}
            alt={listing.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        <div className="absolute top-4 left-4">
          <span className={`${listing.typeColor || 'bg-amber-500'} text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide`}>
            {listing.type}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-2xl font-bold">{listing.price}</p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-sm">
          <span className="bg-white text-slate-900 px-6 py-2.5 rounded-xl font-semibold hover:bg-amber-500 hover:text-white transition-all transform hover:scale-105">
            상세보기
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
          {listing.title}
        </h3>
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
          <Building2 className="w-4 h-4" />
          {listing.specs}
        </div>
        <div className="flex flex-wrap gap-2">
          {(listing.tags || []).map((tag, idx) => (
            <span key={idx} className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
