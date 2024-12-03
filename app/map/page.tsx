// app/page.tsx
'use client'
import React from 'react';
import Map from '@/app/components/ui_parts/Map';

const Page = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY|| '' ; // .envファイルからAPIキーを取得

  const origin = { lat: 34.50470400000002, lng: 135.81955298202976 }; // 出発地点 (例: 東京)
  const destination = { lat: 34.497559830017586, lng: 135.8081375004686 }; // 目的地 (例: ロサンゼルス)
  const waypoints = [
    { lat: 34.491688420159875, lng: 135.7990394474951 }, // 経由地点1 (例: ラスベガス)
    { lat: 34.483552650986226, lng: 135.803416812605 }, // 経由地点2 (例: サンフランシスコ)
  ];

  return (
    <div>
      <h1>Google Maps Directions API</h1>
      <Map apiKey={apiKey} origin={origin} destination={destination} waypoints={waypoints} />
    </div>
  );
};

export default Page;
