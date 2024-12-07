'use client'

import React, { useState, useEffect } from 'react';
import Map from '@/app/components/ui_parts/Map';
import { SpotLocationType, WayPoint } from "../types";

const Page = () => {
  const [selectedWayPoints, setSelectedWayPoints] = useState<SpotLocationType[]>([]);

  useEffect(() => {
    const fetchSelectedLocation = async () => {
      try {
        const response = await fetch('/api/getSelectedLocation', { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to fetch SelectedLocation');
        }
        const data: SpotLocationType[] = await response.json();
        console.log('Fetched data:', data);
        setSelectedWayPoints(data);
      } catch (error) {
        console.error('Error fetching SelectedLocation:', error);
      }
    };

    fetchSelectedLocation();
  }, []);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '';

  const origin = { name: "京阪宇治駅", lat: 34.89483083112986, lng: 135.8070045145702 };

  // selectedWayPoints を基に waypoints を動的に生成
  const waypoints: WayPoint[] = selectedWayPoints.map((point) => ({
    name: point.title,
    lat: point.latitude,
    lng: point.longitude,
  }));

  return (
    <div>
      <Map apiKey={apiKey} origin={origin} waypoints={waypoints} />
    </div>
  );
};

export default Page;
