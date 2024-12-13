'use client';

import React, { useState, useEffect, useRef } from 'react';
import Map from '@/app/components/ui_parts/Map';
import { SpotLocationType, WayPoint } from '../types';
import { useSearchParams } from 'next/navigation';
import Loading from '../loading';
import MapSideBar from '../components/ui_parts/MapSideBar';
import styles from "@/app/statics/styles/mapPage.module.css";

const Page = () => {
  const searchParams = useSearchParams();
  const startingPoint = searchParams.get('startingPoint');
  const [selectedWayPoints, setSelectedWayPoints] = useState<SpotLocationType[]>([]);
  const [origin, setOrigin] = useState<WayPoint>();
  const [duration, setDuration] = useState<string>('');
  const orderRef = useRef<number[]>([]); //refは値が変更されても画面の際レンダリングは実行されない。

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

  const startingPointInt = Number(startingPoint);

  useEffect(() => {
    if (startingPointInt === 0) {
      // 現在地を取得
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setOrigin({ name: '現在地', lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      // 他の出発地点に対応
      switch (startingPointInt) {
        case 1:
          setOrigin({ name: '京阪宇治駅', lat: 34.89483083112986, lng: 135.8070045145702 });
          break;
        case 2:
          setOrigin({ name: '京阪黄檗駅', lat: 34.91433429093788, lng: 135.80257257542314 });
          break;
        case 3:
          setOrigin({ name: '京阪六地蔵駅', lat: 34.93206069950424, lng: 135.79328135941512 });
          break;
        case 4:
          setOrigin({ name: 'JR宇治駅', lat: 34.89047759941201, lng: 135.8007251883931 });
          break;
        case 5:
          setOrigin({ name: 'JR京都駅', lat: 34.98589834797202, lng: 135.75885200990197 });
          break;
        default:
          console.error('不明な出発地点です');
          break;
      }
    }

  }, [startingPointInt]);

  const waypoints: WayPoint[] = selectedWayPoints.map((point) => ({
    name: point.title,
    lat: point.latitude,
    lng: point.longitude,
  }));

  if (!origin) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.mapPage}>
      <MapSideBar
        origin={origin.name}
        duration={duration}
        selectedWayPoints={selectedWayPoints}
        order={orderRef}
        />
      <Map
        apiKey={apiKey}
        origin={origin}
        waypoints={waypoints}
        setDuration={setDuration}
        order={orderRef}
      />
    </div>
  );
};

export default Page;
