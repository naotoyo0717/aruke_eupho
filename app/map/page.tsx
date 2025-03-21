'use client';

import React, { useState, useEffect, useRef } from 'react';
import Map from '@/app/components/ui_parts/Map';
import { SpotLocationType, WayPoint } from '../types';
import { useSearchParams } from 'next/navigation';
import Loading from '../loading';
import styles from "@/app/statics/styles/mapPage.module.css";
import { fetchSelectedLocation } from '../actions/mapActions';

const Page = () => {
  const searchParams = useSearchParams();
  const startingPoint = searchParams.get('startingPoint');
  const isUserLocation = searchParams.get('isUserLocation');
  const isUserLocationBool = isUserLocation === 'true'; // 型変換
  const [selectedWayPoints, setSelectedWayPoints] = useState<SpotLocationType[]>([]);
  const [origin, setOrigin] = useState<WayPoint>();
  const [duration, setDuration] = useState<string>('');
  const orderRef = useRef<number[]>([]); //refは値が変更されても画面の際レンダリングは実行されない。

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '';

  const startingPointInt = Number(startingPoint);
  console.log("ユーザーの位置を表示するか？:", {isUserLocation});

  function getOrigin(startingPointInt: number) {
    switch (startingPointInt) {
      case 1:
        return { name: '京阪宇治駅', lat: 34.89483083112986, lng: 135.8070045145702 };
      case 2:
        return { name: '京阪黄檗駅', lat: 34.91433429093788, lng: 135.80257257542314 };
      case 3:
        return { name: '京阪六地蔵駅', lat: 34.93206069950424, lng: 135.79328135941512 };
      case 4:
        return { name: 'JR宇治駅', lat: 34.89047759941201, lng: 135.8007251883931 };
      case 5:
        return { name: 'JR京都駅', lat: 34.98589834797202, lng: 135.75885200990197 };
      default:
        console.error('不明な出発地点です');
        return null;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedSelectedLocation = await fetchSelectedLocation();
        if (fetchedSelectedLocation) {
          setSelectedWayPoints(fetchedSelectedLocation);
        }
      } catch (error) {
        console.error('Error fetching selected locations:', error);
      }
    };

    fetchData();
  }, []);

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
      const originData = getOrigin(startingPointInt);
      if (originData) {
        setOrigin(originData);
      }
    }
  }, [startingPointInt]);

  const waypoints: WayPoint[] = selectedWayPoints.map((point) => ({
    name: point.title,
    lat: point.latitude,
    lng: point.longitude,
  }));

  return (
    !origin ? (
      <div>
        <Loading />
      </div>
    ) : (
      <div className={styles.mapPage}>
        <Map
          apiKey={apiKey}
          origin={origin}
          waypoints={waypoints}
          setDuration={setDuration}
          order={orderRef}
          duration={duration}
          selectedWayPoints={selectedWayPoints}
          isUserLocation={isUserLocationBool}
        />
      </div>
    )
  );
};

export default Page;