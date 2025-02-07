"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
//import LocationOnIcon from '@mui/icons-material/LocationOn';

// 各地の座標リスト
const markers = [
  { name: "くみこベンチ", lat: 34.889591172809055, lng: 135.80840556784437 },
  { name: "船着場", lat: 34.89072414717244, lng: 135.80972569397184 },
  { name: "宇治神社", lat: 34.8906198323666, lng: 135.8099563470932 },
  { name: "朝霧橋", lat: 34.890229062073516, lng: 135.8094984940262 },
  { name: "JR宇治駅", lat: 34.89047759941201, lng: 135.8007251883931 },
  { name: "京阪宇治駅", lat: 34.89483083112986, lng: 135.8070045145702 },
  { name: "許波多神社", lat: 34.91702231558685, lng: 135.79413684692872 },
  { name: "喜撰橋", lat: 34.88829601089403, lng: 135.81035895316094 },
  { name: "喜撰橋前", lat: 34.88803976828835, lng: 135.80973599400383 },
  { name: "宇治観光センター", lat: 34.88903388297179, lng: 135.80911923409985 },
  { name: "京阪六地蔵駅", lat: 34.93206069950424, lng: 135.79328135941512 },
  { name: "サイゼリア宇治里尻店", lat: 34.892638873681214, lng: 135.80531926663235 },
  { name: "あがた通り大鳥居", lat: 34.892250522585165, lng: 135.8056990555417 },
  { name: "JR京都駅ビル大階段", lat: 34.98595569398, lng: 135.75840730471262 },
  { name: "宇治川水管橋", lat: 34.90034199904685, lng: 135.80146444336629 },
  { name: "大吉山展望台", lat: 34.893077373334904, lng: 135.8134445549873 },
  { name: "京阪黄檗駅", lat: 34.91433429093788, lng: 135.80257257542314 },
  { name: "JR京都駅", lat: 34.98589834797202, lng: 135.75885200990197 }
];

// 赤色のピンアイコンを作成
const redIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png", // デフォルトのピン画像
  iconSize: [25, 41], // アイコンのサイズ
  iconAnchor: [12, 41], // アイコンの基準位置
  popupAnchor: [1, -34], // ポップアップの表示位置
});

export default function Page() {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer center={[34.8906198323666, 135.8099563470932]} zoom={14} style={{ height: "100%", width: "100%" }}>
        {/* Google Maps タイル */}
        <TileLayer
          url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />

        {/* マーカーの描画 */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={redIcon} // 赤色のピンアイコンを設定
            eventHandlers={{ click: () => setSelectedMarker(marker.name) }}
          >
            {/* マーカーがクリックされた場合、そのマーカーに対応するポップアップを表示 */}
            {selectedMarker === marker.name && (
              <Popup>
                <strong>{marker.name}</strong>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
