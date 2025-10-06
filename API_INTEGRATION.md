# NASA API Integration Guide

## 🌌 Overview

AeroStory integrates with multiple NASA APIs to provide real-time space weather data, astronomical images, and cosmic phenomena information. The platform also features Sunny the Solar Flare as an AI-powered character assistant, providing personalized space weather guidance and educational content. This guide covers the implementation, data structures, and best practices for NASA API integration and character-driven interactions.

## 🔑 API Keys and Setup

### Getting Your NASA API Key
1. Visit [NASA API Portal](https://api.nasa.gov/)
2. Fill out the simple form with your information
3. Receive your API key instantly via email
4. Add to your environment variables

### Environment Configuration
```env
# .env file
VITE_NASA_API_KEY=your_api_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### API Base URLs
```typescript
const NASA_API_BASE = 'https://api.nasa.gov';
const DONKI_BASE = 'https://api.nasa.gov/DONKI';
const APOD_BASE = 'https://api.nasa.gov/planetary/apod';
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';
const GROQ_API_BASE = 'https://api.groq.com/openai/v1';
```

## 📊 Integrated APIs

### 1. DONKI (Solar Flares)
**Purpose**: Real-time solar flare and space weather data
**Endpoint**: `https://api.nasa.gov/DONKI/FLR`

#### Request Parameters
```typescript
interface DonkiParams {
  startDate: string;    // YYYY-MM-DD format
  endDate: string;      // YYYY-MM-DD format
  api_key: string;      // Your NASA API key
}
```

#### Response Structure
```typescript
interface SolarFlare {
  flrID: string;
  beginTime: string;        // ISO 8601 format
  peakTime: string;         // ISO 8601 format
  endTime: string;          // ISO 8601 format
  classType: string;        // X, M, C, B, A class
  sourceLocation: string;   // Solar coordinates
  activeRegionNum: number;  // Active region number
  linkedEvents: string[];   // Related event IDs
  notes: string;           // Additional information
}
```

#### Implementation
```typescript
// hooks/useNasaApi.ts
export const useDonkiSolarFlares = (startDate?: string, endDate?: string) => {
  return useQuery({
    queryKey: ['donki-solar-flares', startDate, endDate],
    queryFn: () => fetchDonkiSolarFlares(startDate, endDate),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes
    refetchInterval: 2 * 60 * 1000, // Auto-refresh every 2 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

const fetchDonkiSolarFlares = async (startDate?: string, endDate?: string) => {
  const params = new URLSearchParams({
    api_key: import.meta.env.VITE_NASA_API_KEY,
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  });

  const response = await fetch(`${DONKI_BASE}/FLR?${params}`);
  
  if (!response.ok) {
    throw new Error(`DONKI API error: ${response.status}`);
  }
  
  return response.json();
};
```

### 2. APOD (Astronomy Picture of the Day)
**Purpose**: Daily astronomical images with explanations
**Endpoint**: `https://api.nasa.gov/planetary/apod`

#### Request Parameters
```typescript
interface ApodParams {
  date?: string;        // YYYY-MM-DD format (optional)
  start_date?: string;  // Start date for range
  end_date?: string;    // End date for range
  count?: number;       // Number of images (max 100)
  thumbs?: boolean;     // Include thumbnail URLs
  api_key: string;      // Your NASA API key
}
```

#### Response Structure
```typescript
interface APOD {
  date: string;           // YYYY-MM-DD format
  explanation: string;    // Detailed explanation
  hdurl?: string;         // High-definition image URL
  media_type: string;     // 'image' or 'video'
  service_version: string; // API version
  title: string;          // Image title
  url: string;            // Standard image URL
  thumbnail_url?: string; // Thumbnail URL (if requested)
}
```

#### Implementation
```typescript
export const useApod = (date?: string) => {
  return useQuery({
    queryKey: ['apod', date],
    queryFn: () => fetchApod(date),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

const fetchApod = async (date?: string) => {
  const params = new URLSearchParams({
    api_key: import.meta.env.VITE_NASA_API_KEY,
    thumbs: 'true',
    ...(date && { date }),
  });

  const response = await fetch(`${APOD_BASE}?${params}`);
  
  if (!response.ok) {
    throw new Error(`APOD API error: ${response.status}`);
  }
  
  return response.json();
};
```

### 3. Near Earth Objects (NEO)
**Purpose**: Asteroid and comet tracking data
**Endpoint**: `https://api.nasa.gov/neo/rest/v1/feed`

#### Request Parameters
```typescript
interface NeoParams {
  start_date: string;     // YYYY-MM-DD format
  end_date: string;       // YYYY-MM-DD format
  detailed?: boolean;     // Include detailed information
  api_key: string;        // Your NASA API key
}
```

#### Response Structure
```typescript
interface NEOData {
  element_count: number;
  links: {
    next?: string;
    prev?: string;
    self: string;
  };
  near_earth_objects: {
    [date: string]: NearEarthObject[];
  };
}

interface NearEarthObject {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: CloseApproachData[];
}
```

### 4. Space Weather (Custom Integration)
**Purpose**: General space weather information
**Endpoint**: Custom implementation combining multiple NASA sources

#### Implementation
```typescript
export const useSpaceWeather = () => {
  return useQuery({
    queryKey: ['space-weather'],
    queryFn: fetchSpaceWeather,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000,   // 30 minutes
    refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
  });
};

const fetchSpaceWeather = async () => {
  // Combine multiple NASA APIs for comprehensive space weather data
  const [solarFlares, apod, neo] = await Promise.all([
    fetchDonkiSolarFlares(),
    fetchApod(),
    fetchNEO(new Date().toISOString().split('T')[0])
  ]);

  return {
    solarFlares,
    apod,
    neo,
    timestamp: new Date().toISOString(),
  };
};
```

## 🤖 Sunny ChatBot Character System

### Character Integration
The ChatBot has been transformed into Sunny the Solar Flare, a character-driven AI assistant that provides personalized space weather guidance.

### Character Identity
```typescript
interface SunnyCharacter {
  name: string;
  personality: {
    greeting: string;
    expertise: string;
    enthusiasm: string;
  };
  visualIdentity: {
    image: string; // Sunny.png
    colorScheme: 'orange-red';
    theme: 'solar-flare';
  };
  capabilities: string[];
}

const sunnyCharacter: SunnyCharacter = {
  name: "Sunny the Solar Flare",
  personality: {
    greeting: "Hi there! ☀️ I'm Sunny, your friendly solar flare!",
    expertise: "I love traveling from the Sun to Earth and creating beautiful auroras.",
    enthusiasm: "Ask me anything about my cosmic adventures, space weather, or how I affect life on your planet!"
  },
  visualIdentity: {
    image: "src/assets/Sunny.png",
    colorScheme: "orange-red",
    theme: "solar-flare"
  },
  capabilities: [
    "Space weather explanations",
    "Solar flare journey guidance", 
    "Aurora formation education",
    "Cosmic adventure storytelling"
  ]
};
```

### AI API Integration for Character Responses
```typescript
// Gemini AI integration with Sunny's personality
const generateSunnyResponse = async (userInput: string): Promise<string> => {
  const prompt = `
You are Sunny the Solar Flare, a friendly and enthusiastic character who loves to share knowledge about space weather and cosmic adventures.

Character traits:
- Friendly and approachable
- Passionate about solar flares and auroras
- Loves to tell stories about cosmic journeys
- Educational but fun
- Uses solar flare terminology naturally

User question: ${userInput}

Respond as Sunny with enthusiasm and expertise about space weather phenomena.
  `;

  const response = await fetch(`${GEMINI_API_BASE}/models/gemini-1.5-flash-001:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    })
  });

  return response.json();
};

// Groq API fallback with Sunny's personality
const generateSunnyResponseFallback = async (userInput: string): Promise<string> => {
  const response = await fetch(`${GROQ_API_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${groqApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: "You are Sunny the Solar Flare, a friendly character who loves space weather and cosmic adventures. Be enthusiastic and educational."
        },
        {
          role: "user", 
          content: userInput
        }
      ]
    })
  });

  return response.json();
};
```

### Character-Driven UI Elements
```typescript
// Sunny-themed visual components
const SunnyChatButton = () => (
  <Button className="bg-gradient-to-r from-orange-500 to-red-500">
    <img 
      src={SunnyImage} 
      alt="Sunny the Solar Flare" 
      className="w-full h-full rounded-full object-cover"
    />
  </Button>
);

const SunnyHeader = () => (
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-orange-500">
      <img 
        src={SunnyImage} 
        alt="Sunny the Solar Flare" 
        className="w-full h-full object-cover"
      />
    </div>
    <div>
      <h3 className="font-semibold text-white">Sunny the Solar Flare</h3>
      <p className="text-xs text-foreground/70">Ready to help!</p>
    </div>
  </div>
);

const SunnyTypingIndicator = () => (
  <div className="flex items-center gap-2">
    <img 
      src={SunnyImage} 
      alt="Sunny" 
      className="w-4 h-4 rounded-full object-cover"
    />
    <span className="text-sm text-foreground/70">Sunny is typing</span>
    <div className="flex gap-1">
      <div className="w-1 h-1 bg-orange-500/60 rounded-full animate-pulse" />
      <div className="w-1 h-1 bg-orange-500/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
      <div className="w-1 h-1 bg-orange-500/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
    </div>
  </div>
);
```

## 🔧 Error Handling

### API Error Types
```typescript
interface ApiError {
  code: number;
  message: string;
  details?: string;
}

class NasaApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public endpoint: string
  ) {
    super(`NASA API Error (${status}): ${message}`);
    this.name = 'NasaApiError';
  }
}
```

### Error Handling Implementation
```typescript
const handleApiError = (error: unknown): never => {
  if (error instanceof NasaApiError) {
    console.error(`NASA API Error: ${error.message}`);
    // Log to monitoring service
    // analytics.track('nasa_api_error', { status: error.status, endpoint: error.endpoint });
    throw error;
  }
  
  if (error instanceof TypeError) {
    // Network error
    console.error('Network error:', error.message);
    throw new Error('Unable to connect to NASA APIs. Please check your internet connection.');
  }
  
  console.error('Unknown error:', error);
  throw new Error('An unexpected error occurred while fetching data.');
};
```

### Retry Logic
```typescript
const fetchWithRetry = async (
  url: string,
  options: RequestInit,
  maxRetries: number = 3
): Promise<Response> => {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      if (response.ok) {
        return response;
      }
      
      if (response.status === 429) {
        // Rate limited - wait longer
        const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      if (response.status >= 500) {
        // Server error - retry
        lastError = new NasaApiError(response.status, 'Server error', url);
        continue;
      }
      
      // Client error - don't retry
      throw new NasaApiError(response.status, 'Client error', url);
      
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError!;
};
```

## 📊 Data Caching Strategy

### React Query Configuration
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: (data, query) => {
        // Different refresh intervals for different data types
        switch (query.queryKey[0]) {
          case 'donki-solar-flares':
            return 2 * 60 * 1000; // 2 minutes
          case 'apod':
            return 24 * 60 * 60 * 1000; // 24 hours
          case 'space-weather':
            return 5 * 60 * 1000; // 5 minutes
          default:
            return false;
        }
      },
    },
  },
});
```

### Cache Invalidation
```typescript
// Invalidate cache when needed
const invalidateNasaData = () => {
  queryClient.invalidateQueries({ queryKey: ['donki-solar-flares'] });
  queryClient.invalidateQueries({ queryKey: ['apod'] });
  queryClient.invalidateQueries({ queryKey: ['space-weather'] });
};

// Manual refresh
const refreshSolarFlares = () => {
  queryClient.refetchQueries({ queryKey: ['donki-solar-flares'] });
};
```

## 🚀 Performance Optimization

### Request Optimization
```typescript
// Debounced requests to prevent excessive API calls
const debouncedFetch = debounce(async (params: any) => {
  return fetchDonkiSolarFlares(params.startDate, params.endDate);
}, 500);

// Request deduplication
const requestCache = new Map<string, Promise<any>>();

const fetchWithDeduplication = async (key: string, fetcher: () => Promise<any>) => {
  if (requestCache.has(key)) {
    return requestCache.get(key);
  }
  
  const promise = fetcher().finally(() => {
    requestCache.delete(key);
  });
  
  requestCache.set(key, promise);
  return promise;
};
```

### Data Transformation
```typescript
// Transform raw API data for UI consumption
const transformSolarFlareData = (rawData: SolarFlare[]): ProcessedSolarFlare[] => {
  return rawData.map(flare => ({
    ...flare,
    beginTime: new Date(flare.beginTime),
    peakTime: new Date(flare.peakTime),
    endTime: new Date(flare.endTime),
    intensity: getFlareIntensity(flare.classType),
    duration: calculateDuration(flare.beginTime, flare.endTime),
    isActive: isCurrentlyActive(flare.beginTime, flare.endTime),
  }));
};

const getFlareIntensity = (classType: string): 'low' | 'medium' | 'high' | 'extreme' => {
  switch (classType[0]) {
    case 'A':
    case 'B':
    case 'C':
      return 'low';
    case 'M':
      return 'medium';
    case 'X':
      return classType.includes('10') ? 'extreme' : 'high';
    default:
      return 'low';
  }
};
```

## 🔒 Security Considerations

### API Key Protection
```typescript
// Never expose API key in client-side code
const apiKey = import.meta.env.VITE_NASA_API_KEY;

if (!apiKey) {
  throw new Error('NASA API key is required');
}

// Use environment variables for all sensitive data
const config = {
  apiKey: import.meta.env.VITE_NASA_API_KEY,
  baseUrl: import.meta.env.VITE_NASA_API_BASE_URL || 'https://api.nasa.gov',
  rateLimit: parseInt(import.meta.env.VITE_NASA_RATE_LIMIT || '1000'),
};
```

### Rate Limiting
```typescript
// Implement client-side rate limiting
class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 1000, windowMs: number = 3600000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    
    if (this.requests.length >= this.maxRequests) {
      return false;
    }
    
    this.requests.push(now);
    return true;
  }
}

const rateLimiter = new RateLimiter(1000, 3600000); // 1000 requests per hour
```

## 📱 Mobile Optimization

### Responsive Data Loading
```typescript
// Load different data amounts based on device
const getDataLimit = (): number => {
  if (window.innerWidth < 768) {
    return 10; // Mobile: fewer items
  } else if (window.innerWidth < 1024) {
    return 20; // Tablet: medium amount
  } else {
    return 50; // Desktop: more items
  }
};

// Optimize image loading for mobile
const getOptimizedImageUrl = (url: string, width?: number): string => {
  if (!width) {
    width = window.innerWidth < 768 ? 400 : 800;
  }
  
  // Use thumbnail for mobile if available
  if (window.innerWidth < 768 && url.includes('apod')) {
    return url.replace('.jpg', '_thumb.jpg');
  }
  
  return url;
};
```

## 🧪 Testing

### Mock API Responses
```typescript
// Mock data for testing
export const mockSolarFlareData: SolarFlare[] = [
  {
    flrID: 'FLR20240320001',
    beginTime: '2024-03-20T10:00:00Z',
    peakTime: '2024-03-20T10:15:00Z',
    endTime: '2024-03-20T10:30:00Z',
    classType: 'X1.2',
    sourceLocation: 'N15E45',
    activeRegionNum: 13664,
    linkedEvents: ['CME20240320001'],
    notes: 'Strong X-class flare with associated CME'
  }
];

// Test utilities
export const createMockResponse = (data: any, status: number = 200) => {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
  };
};
```

### Integration Tests
```typescript
// Test API integration
describe('NASA API Integration', () => {
  beforeEach(() => {
    // Mock fetch
    global.fetch = jest.fn();
  });

  it('should fetch solar flare data successfully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(
      createMockResponse(mockSolarFlareData)
    );

    const result = await fetchDonkiSolarFlares();
    expect(result).toEqual(mockSolarFlareData);
  });

  it('should handle API errors gracefully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(
      createMockResponse({ error: 'Rate limit exceeded' }, 429)
    );

    await expect(fetchDonkiSolarFlares()).rejects.toThrow('NASA API Error');
  });
});
```

---

This guide provides comprehensive information about NASA API integration in AeroStory. For specific implementation details, refer to the source code in the `hooks/useNasaApi.ts` file and the individual component implementations.
