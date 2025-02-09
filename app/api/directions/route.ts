import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDfpo6MS4ns9RvJ996RcAD-7ljMgWXK1vw';
const GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/directions/json';

// /app/api/directions/route.ts

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { origin, destination, waypoints } = req.body || req.query;
  
    if (!origin || !destination) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
  
    const waypointStr = waypoints && waypoints.length > 0
      ? `&waypoints=optimize:true|${waypoints.map((wp: { lat: number, lng: number }) => `${wp.lat},${wp.lng}`).join('|')}`
      : '';
  
    const url = `${GOOGLE_MAPS_API_URL}?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}${waypointStr}&mode=walking&key=${GOOGLE_MAPS_API_KEY}`;
  
    // リクエストURLをログ出力
    console.log(url);
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log(`Google Maps API error: ${response.statusText}`); // エラーレスポンスをログ
        return res.status(response.status).json({ error: `Google Maps API error: ${response.statusText}` });
      }
  
      const data = await response.json();
      if (!data || data.status !== 'OK') {
        console.log("Error from Google Maps API:", data.error_message); // Google Maps APIからのエラーをログ
        return res.status(400).json({ error: data.error_message || 'Failed to fetch directions' });
      }
  
      return data;
    } catch (error) {
      console.log("Catch block error:", error); // 追加のエラーログ
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  