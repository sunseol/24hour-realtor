import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function PropertyGallery({ images = [], title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!images || images.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="relative rounded-2xl overflow-hidden bg-slate-900">
        <div className="aspect-video relative">
          <img
            src={images[currentIndex]}
            alt={`${title} - 이미지 ${currentIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setIsFullscreen(true)}
          />
          
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                aria-label="이전 이미지"
              >
                <ChevronLeft className="w-6 h-6 text-slate-700" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                aria-label="다음 이미지"
              >
                <ChevronRight className="w-6 h-6 text-slate-700" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                }`}
                aria-label={`이미지 ${idx + 1}로 이동`}
              />
            ))}
          </div>
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 p-4 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === currentIndex ? 'border-amber-500' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`썸네일 ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
            aria-label="닫기"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <img
            src={images[currentIndex]}
            alt={`${title} - 이미지 ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
                aria-label="이전 이미지"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
                aria-label="다음 이미지"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
