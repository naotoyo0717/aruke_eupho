"use client";

import React, { useCallback, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

// 明示的に型を定義
//type Libraries = ("places" | "drawing" | "geometry" | "localContext" | "visualization")[];

//const libraries: Libraries = ["places"];
// 利用するGoogle Maps APIのライブラリを指定

const mapContainerStyle: React.CSSProperties = {
  height: "100vh",
  width: "100%",
};
// 地図のスタイルを定義

const options: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};
// 地図のオプションを設定

export default function GoogleMapComponent(): JSX.Element {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
    //libraries,
  });
  // Google Maps APIをロード

  const mapRef = useRef<google.maps.Map | null>(null);
  // useRefで地図インスタンスを保持
  const onMapLoad = useCallback((map: google.maps.Map): void => {
    mapRef.current = map;
  }, []);
  // 地図が読み込まれたときの処理
  // useCallback: 依存配列に指定した値が変わらない限りReactは関数を再生成せず、前回の関数をそのまま利用

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={{
        lat: 43.048225,
        lng: 141.49701,
      }}
      options={options}
      onLoad={onMapLoad}
    >
      {/* 地図上に表示したい要素があればここに追加 */}
    </GoogleMap>
  );
}
