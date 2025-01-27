import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  OverlayView,
} from '@react-google-maps/api';
import MapSideBar from '../map_sidebar/MapSideBar';
import { SpotLocationType } from '@/app/types';

interface MapProps {
  apiKey: string;
  origin: { name: string; lat: number; lng: number };
  waypoints: { name: string; lat: number; lng: number }[];
  setDuration: React.Dispatch<React.SetStateAction<string>>;
  order: React.MutableRefObject<number[]>;
  duration: string;
  selectedWayPoints: SpotLocationType[];
  isUserLocation: boolean;
}

const Map: React.FC<MapProps> = ({ apiKey, origin, waypoints, setDuration, order, duration, selectedWayPoints, isUserLocation }) => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [error, setError] = useState<string>('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (googleLoaded && window.google && window.google.maps) {
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

          order.current = result.routes[0].waypoint_order;
        } else {
          setError('経路の取得に失敗しました。再度お試しください。');
          console.error('Directions request failed due to ' + status);
        }
      });
    } else if (!googleLoaded) {
      console.log('Google Maps APIがまだロードされていません。');
    }
  }, [origin, waypoints, googleLoaded, setDuration, order]);

  useEffect(() => {
    let watchId: number | null = null;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          console.log('ユーザーの現在地:', { lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('位置情報の取得に失敗しました:', error.message);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 10000,
        }
      );
    } else {
      console.error('このブラウザはGeolocation APIをサポートしていません。');
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <>
      <LoadScript googleMapsApiKey={apiKey} onLoad={() => setGoogleLoaded(true)}>
        {error && <div style={{ padding: '10px', color: 'red' }}>{error}</div>}

        {googleLoaded && (
          <GoogleMap
            mapContainerStyle={{ height: '100vh', width: '100%' }}
            center={origin}
            zoom={15}
            options={{
              fullscreenControl: false,
            }}
          >
            {directions ? <DirectionsRenderer directions={directions} /> : null}

            <OverlayView position={origin} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
              <div style={labelStyle}>{origin.name}</div>
            </OverlayView>

            {waypoints.map((waypoint, index) => (
              <OverlayView
                key={index}
                position={{ lat: waypoint.lat, lng: waypoint.lng }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div style={labelStyle}>{waypoint.name}</div>
              </OverlayView>
            ))}

            {isUserLocation && userLocation && (
              <OverlayView position={userLocation} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                <>
                  <div style={userLabelStyle}></div>
                  <div style={circleStyle}></div>
                </>
              </OverlayView>
            )}

            <MapSideBar
              origin={origin.name}
              duration={duration}
              selectedWayPoints={selectedWayPoints}
              order={order}
            />
          </GoogleMap>
        )}
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

const userLabelStyle: React.CSSProperties = {
  fontSize: '1rem',
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  color: '#0000FF',
};

const circleStyle: React.CSSProperties = {
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  position: 'absolute',
  backgroundColor: 'rgba(52, 177, 235, 0.9)',
  border: '2px solid white',
  transform: 'translate(-50%, -50%)',
};
