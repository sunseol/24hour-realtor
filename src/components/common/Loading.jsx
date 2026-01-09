import React from 'react';

export function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <svg
      className={`animate-spin text-amber-500 ${sizes[size]} ${className}`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 animate-pulse">
      <div className="h-56 bg-slate-200" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-slate-200 rounded w-3/4" />
        <div className="h-4 bg-slate-200 rounded w-1/2" />
        <div className="flex gap-2">
          <div className="h-6 bg-slate-200 rounded w-16" />
          <div className="h-6 bg-slate-200 rounded w-16" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-slate-200 rounded animate-pulse"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-slate-600">로딩 중...</p>
      </div>
    </div>
  );
}

export default { Spinner, SkeletonCard, SkeletonText, PageLoader };
