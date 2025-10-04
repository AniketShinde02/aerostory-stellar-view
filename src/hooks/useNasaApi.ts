import { useQuery } from '@tanstack/react-query';

// NASA API endpoints with optimized configurations
const NASA_API_BASE = 'https://api.nasa.gov';

// DONKI Solar Flare API
export const useDonkiSolarFlares = () => {
  return useQuery({
    queryKey: ['donki', 'solar-flares'],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const response = await fetch(
        `${NASA_API_BASE}/DONKI/FLR?api_key=${import.meta.env.VITE_NASA_API_KEY}&startDate=${today}`
      );
      
      if (!response.ok) {
        throw new Error(`DONKI API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return {
        solarFlares: data || [],
        lastUpdated: new Date().toISOString(),
        status: data && data.length > 0 ? 'active' : 'quiet',
        alertLevel: data && data.length > 0 ? 'moderate' : 'none'
      };
    },
    staleTime: 2 * 60 * 1000, // 2 minutes for real-time data
    cacheTime: 5 * 60 * 1000, // 5 minutes cache
    refetchInterval: 2 * 60 * 1000, // Auto-refresh every 2 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// APOD API
export const useApod = () => {
  return useQuery({
    queryKey: ['apod', 'daily'],
    queryFn: async () => {
      const response = await fetch(
        `${NASA_API_BASE}/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`APOD API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return {
        ...data,
        fetchedAt: new Date().toISOString()
      };
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 hours for daily content
    cacheTime: 48 * 60 * 60 * 1000, // 48 hours cache
    refetchInterval: 24 * 60 * 60 * 1000, // Refresh daily
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// ISS Location API (third-party)
export const useIssLocation = () => {
  return useQuery({
    queryKey: ['iss', 'location'],
    queryFn: async () => {
      const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
      
      if (!response.ok) {
        throw new Error(`ISS API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return {
        latitude: parseFloat(data.latitude.toFixed(2)),
        longitude: parseFloat(data.longitude.toFixed(2)),
        altitude: parseFloat(data.altitude.toFixed(2)),
        velocity: parseFloat(data.velocity.toFixed(2)),
        visibility: data.visibility === "daylight" ? "Day" : "Night",
        lastUpdated: new Date().toISOString()
      };
    },
    staleTime: 30 * 1000, // 30 seconds for real-time position
    cacheTime: 2 * 60 * 1000, // 2 minutes cache
    refetchInterval: 30 * 1000, // Update every 30 seconds
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Near Earth Objects API
export const useNearEarthObjects = () => {
  return useQuery({
    queryKey: ['neo', 'today'],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const response = await fetch(
        `${NASA_API_BASE}/neo/rest/v1/feed?start_date=${today}&api_key=${import.meta.env.VITE_NASA_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`NEO API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      const todayObjects = Object.values(data.near_earth_objects)[0] as any[];
      
      return {
        todayCount: todayObjects?.length || 0,
        hazardousCount: todayObjects?.filter(obj => obj.is_potentially_hazardous_asteroid).length || 0,
        largestDiameter: todayObjects?.reduce((max, obj) => 
          Math.max(max, obj.estimated_diameter?.meters?.estimated_diameter_max || 0), 0) || 0,
        closestDistance: todayObjects?.reduce((min, obj) => 
          Math.min(min, parseFloat(obj.close_approach_data?.[0]?.miss_distance?.kilometers || '999999999')), 999999999) || 0,
        lastUpdated: new Date().toISOString()
      };
    },
    staleTime: 60 * 60 * 1000, // 1 hour for daily asteroid data
    cacheTime: 2 * 60 * 60 * 1000, // 2 hours cache
    refetchInterval: 60 * 60 * 1000, // Refresh hourly
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
