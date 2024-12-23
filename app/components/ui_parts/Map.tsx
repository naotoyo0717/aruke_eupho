import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  OverlayView,
} from '@react-google-maps/api';
import MapSideBar from '../map_sidebar/MapSideBar';
import { SpotLocationType } from '@/app/types';
//import Loading from '@/app/loading';

interface MapProps {
  apiKey: string;
  origin: { name: string; lat: number; lng: number };
  waypoints: { name: string; lat: number; lng: number }[];
  setDuration: React.Dispatch<React.SetStateAction<string>>;
  order: React.MutableRefObject<number[]>;
  duration: string;
  selectedWayPoints: SpotLocationType[];
}

const Map: React.FC<MapProps> = ({ apiKey, origin, waypoints, setDuration, order, duration, selectedWayPoints }) => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (googleLoaded) {
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
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.WALKING,
      };

      console.log('Directions APIリクエスト:', request);

      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);

          const totalDuration = result.routes[0].legs.reduce((acc, leg) => {
            return leg.duration?.value ? acc + leg.duration.value : acc;
          }, 0);
          const hours = Math.floor(totalDuration / 3600);
          const minutes = Math.floor((totalDuration % 3600) / 60);
          setDuration(`${hours}時間 ${minutes}分`);

          // useRef を利用して order を保存
          order.current = result.routes[0].waypoint_order;
        } else {
          setError('経路の取得に失敗しました。再度お試しください。');
          console.error('Directions request failed due to ' + status);
        }
      });
          
          
        }
      }, [origin, waypoints, googleLoaded, setDuration, order]);

  return (
    <>
      <LoadScript googleMapsApiKey={apiKey} onLoad={() => setGoogleLoaded(true)} /*loadingElement={<Loading />}*/>
        {error && <div style={{ padding: '10px', color: 'red' }}>{error}</div>}

        <GoogleMap
          mapContainerStyle={{ height: '100vh', width: '100%' }}
          center={origin}
          zoom={15}
          options={{
            fullscreenControl: false, // 全画面表示ボタンを非表示にする
          }}
        >
          {directions && <DirectionsRenderer directions={directions} />}
          <OverlayView position={origin} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
            <div style={labelStyle}>{origin.name}</div>
          </OverlayView>
          {waypoints.map((waypoint, index) => (
            <OverlayView key={index} position={waypoint} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
              <div style={labelStyle}>{waypoint.name}</div>
            </OverlayView>
          ))}

        <MapSideBar
          origin={origin.name}
          duration={duration}
          selectedWayPoints={selectedWayPoints}
          order={order}
        />
        </GoogleMap>
      </LoadScript>
    </>
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
 