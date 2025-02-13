'use client';

import { useAddressToCoordinate } from '@/hooks/useMap';
import { useEffect, useRef } from 'react';

interface Props {
  address?: string;
}

export default function Maps({ address }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { x, y } = useAddressToCoordinate({
    address,
  });

  const isValidCoordinate = x && y;

  useEffect(() => {
    if (mapRef.current && isValidCoordinate) {
      const location = new naver.maps.LatLng(y, x);
      const mapOptions = {
        center: location,
        zoom: 12,
      };

      const map = new naver.maps.Map(mapRef.current, mapOptions);
      new naver.maps.Marker({
        position: location,
        map,
      });
    }
  }, [isValidCoordinate, x, y]);

  return (
    <div className="absolute w-full h-full">
      {isValidCoordinate ? (
        <div ref={mapRef} className="w-full h-full" />
      ) : (
        <div className="bg-slate-200 w-full h-full flex justify-center items-center">
          <p className="text-label-md">위치를 표시할 수 없습니다.</p>
        </div>
      )}
    </div>
  );
}
