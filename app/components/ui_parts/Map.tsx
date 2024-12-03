'use client'

// components/Map.tsx
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';

interface MapProps {
  apiKey: string;
  origin: google.maps.LatLngLiteral
  destination: google.maps.LatLngLiteral;
  waypoints: google.maps.LatLngLiteral[];
}

const Map: React.FC<MapProps> = ({ apiKey, origin, destination, waypoints }) => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [googleLoaded, setGoogleLoaded] = useState(false); // Added loading state

  // Directions APIを呼び出して経路を取得する
  useEffect(() => {
    if (typeof google !== 'undefined' && google.maps && googleLoaded) {
      const directionsService = new google.maps.DirectionsService();

      const request: google.maps.DirectionsRequest = {
        origin,
        destination,
        waypoints: waypoints.map((point) => ({ location: point, stopover: true })),
        travelMode: google.maps.TravelMode.WALKING, // 車での移動
      };

      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error('Directions request failed due to ' + status);
        }
      });
    }
  }, [origin, destination, waypoints, googleLoaded]);

  return (
    <LoadScript googleMapsApiKey={apiKey} onLoad={() => setGoogleLoaded(true)}>
      <GoogleMap
        mapContainerStyle={{ height: '500px', width: '100%' }}
        center={origin}
        zoom={12}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
