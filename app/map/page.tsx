'use client'

import React from 'react';
import Map from '@/app/components/ui_parts/Map';

const Page = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '' ;

  const origin = { name: "京阪宇治駅", lat: 34.89483083112986, lng: 135.8070045145702 }; 
 
  const waypoints = [
    {name: "船着場", lat: 34.89072414717244, lng: 135.80972569397184 }, 
    {name: "朝霧橋", lat: 34.890229062073516, lng: 135.8094984940262 },
    {name: "宇治神社", lat: 34.8906198323666, lng: 135.8099563470932},
    {name: "JR宇治駅", lat: 34.89047759941201, lng: 135.8007251883931},
  ];

  return (
    <div>
      <Map apiKey={apiKey} origin={origin} waypoints={waypoints} />
    </div>
  );
};

export default Page;
