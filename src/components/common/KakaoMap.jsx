import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

export default function KakaoMap({ 
  address, 
  lat, 
  lng, 
  level = 3, 
  className = '',
  markerTitle = ''
}) {
  const mapRef = useRef(null);
  const [mapError, setMapError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!window.kakao?.maps) {
      setMapError(true);
      setIsLoading(false);
      return;
    }

    window.kakao.maps.load(() => {
      try {
        const container = mapRef.current;
        if (!container) return;

        if (lat && lng) {
          const position = new window.kakao.maps.LatLng(lat, lng);
          const options = {
            center: position,
            level: level
          };
          
          const map = new window.kakao.maps.Map(container, options);
          
          const marker = new window.kakao.maps.Marker({
            position: position,
            map: map
          });

          if (markerTitle) {
            const infowindow = new window.kakao.maps.InfoWindow({
              content: `<div style="padding:5px;font-size:12px;">${markerTitle}</div>`
            });
            infowindow.open(map, marker);
          }

          setIsLoading(false);
        } else if (address) {
          const geocoder = new window.kakao.maps.services.Geocoder();
          
          geocoder.addressSearch(address, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              
              const options = {
                center: coords,
                level: level
              };
              
              const map = new window.kakao.maps.Map(container, options);
              
              const marker = new window.kakao.maps.Marker({
                position: coords,
                map: map
              });

              if (markerTitle) {
                const infowindow = new window.kakao.maps.InfoWindow({
                  content: `<div style="padding:5px;font-size:12px;">${markerTitle}</div>`
                });
                infowindow.open(map, marker);
              }

              setIsLoading(false);
            } else {
              setMapError(true);
              setIsLoading(false);
            }
          });
        } else {
          setMapError(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('KakaoMap error:', error);
        setMapError(true);
        setIsLoading(false);
      }
    });
  }, [address, lat, lng, level, markerTitle]);

  if (mapError) {
    return (
      <div className={`bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 ${className}`}>
        <div className="text-center p-8">
          <MapPin className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p className="font-medium">지도를 불러올 수 없습니다</p>
          <p className="text-sm mt-1">{address}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-100 rounded-2xl flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-slate-500 text-sm">지도 로딩중...</p>
          </div>
        </div>
      )}
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-2xl"
        style={{ minHeight: '300px' }}
      />
    </div>
  );
}
