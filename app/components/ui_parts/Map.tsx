'use client';

import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  OverlayView,
} from '@react-google-maps/api';

interface MapProps {
  apiKey: string;
  origin: { name: string; lat: number; lng: number };
  waypoints: { name: string; lat: number; lng: number }[];
}

const Map: React.FC<MapProps> = ({ apiKey, origin, waypoints }) => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [duration, setDuration] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Directions APIを呼び出して経路を取得
  useEffect(() => {
    if (typeof google !== 'undefined' && google.maps && googleLoaded) {
      const directionsService = new google.maps.DirectionsService();

      const destination = waypoints.length > 0 ? waypoints[waypoints.length - 1] : origin;
      const waypointList = waypoints.map((point) => ({
        location: { lat: point.lat, lng: point.lng },
        stopover: true,
      }));

      const request: google.maps.DirectionsRequest = {
        origin: { lat: origin.lat, lng: origin.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        waypoints: waypointList,
        travelMode: google.maps.TravelMode.WALKING,
        optimizeWaypoints: true,
      };

      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);

          // 所要時間を取得してセット
          if (result.routes.length > 0) {
            const route = result.routes[0];
            const totalDuration = route.legs.reduce((acc, leg) => {
              if (leg.duration && leg.duration.value !== undefined) {
                return acc + leg.duration.value;
              }
              return acc; // durationがundefinedの場合は加算しない
            }, 0);
            const hours = Math.floor(totalDuration / 3600);
            const minutes = Math.floor((totalDuration % 3600) / 60);
            setDuration(`${hours}時間 ${minutes}分`);
          }
        } else {
          // エラー処理
          setError('経路の取得に失敗しました。再度お試しください。');
          console.error('Directions request failed due to ' + status);
        }
      });
    }
  }, [origin, waypoints, googleLoaded]);

  return (
    <LoadScript googleMapsApiKey={apiKey} onLoad={() => setGoogleLoaded(true)}>
      <GoogleMap
        mapContainerStyle={{ height: '100vh', width: '100%' }}
        center={origin}
        zoom={16}
      >
        {/* Directions */}
        {directions && <DirectionsRenderer directions={directions} />}

        {/* 出発地点のラベル */}
        <OverlayView
          position={{ lat: origin.lat, lng: origin.lng }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div style={labelStyle}>{origin.name}</div>
        </OverlayView>

        {/* 経由地点のラベル */}
        {waypoints.map((waypoint, index) => (
          <OverlayView
            key={index}
            position={{ lat: waypoint.lat, lng: waypoint.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div style={labelStyle}>{waypoint.name}</div>
          </OverlayView>
        ))}
      </GoogleMap>

      {/* 所要時間を表示 */}
      {duration && <div style={{ padding: '10px', fontSize: '1.2rem' }}>所要時間: {duration}</div>}

      {/* エラーメッセージ表示 */}
      {error && <div style={{ padding: '10px', color: 'red' }}>{error}</div>}
    </LoadScript>
  );
};

export default Map;

const labelStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  color: '#443322',
};
