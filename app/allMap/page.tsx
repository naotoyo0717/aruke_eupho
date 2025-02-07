'use client'

import { useEffect, useState } from "react";
import AllMap from "../components/allMap/allMap";
import { AllMapType } from "../types";
import { fetchAllMap } from "../actions/allMapActions";
import Loading from "../loading";

export default function Page() {
  const [allMapSpot, setAllMapSpot] = useState<AllMapType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAllMap = await fetchAllMap();
        if (fetchedAllMap) {
          setAllMapSpot(fetchedAllMap);
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error during data fetching:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ?
        <Loading/> : <AllMap allMapSpot={allMapSpot} />
      }
    </div>
  );
}
