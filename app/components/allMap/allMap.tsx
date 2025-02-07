'use client'

import { GoogleMap, LoadScript, Marker, OverlayView } from "@react-google-maps/api";
import { useRouter } from 'next/navigation'; // useRouter をインポート

type AllMapProps = {
  allMapSpot: { id: number; title: string; latitude: number; longitude: number }[];
};

const defaultLatLng = { lat: 34.8906198323666, lng: 135.8099563470932 };
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '';

const labelStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  color: '#443322',
  background: 'transparent',
  padding: '4px 8px',
  borderRadius: '4px',
  textAlign: 'center',
};

const buttonStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  position: "absolute",
  left: "-50%",
  transform: "translateX(-50%)",
  padding: "0",
};

export default function AllMap({ allMapSpot }: AllMapProps) {
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/top/showReview/${id}`);
  };

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          center={defaultLatLng}
          zoom={16}
          mapContainerStyle={{ height: "100vh", width: "100vw" }}
        >
          {allMapSpot.map((spot) => (
            <Marker key={spot.id} position={{ lat: spot.latitude, lng: spot.longitude }}>
              {/* OverlayView でボタン全体をカバーする */}
              <OverlayView
                position={{ lat: spot.latitude, lng: spot.longitude }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <button
                  onClick={() => handleClick(spot.id)}
                  style={buttonStyle}
                >
                  <div style={labelStyle}>
                    No.{spot.id} {spot.title}
                  </div>
                </button>
              </OverlayView>
            </Marker>
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
