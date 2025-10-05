# AeroStory Development Documentation

## 🏗️ Technical Architecture

### Core Technologies
- **React 18** with TypeScript for type-safe development
- **Vite** for fast development and optimized builds
- **Tailwind CSS** with custom design system
- **shadcn/ui** components built on Radix UI primitives
- **React Router DOM v7** with future flags enabled
- **TanStack React Query** for data fetching and caching

### 3D Graphics Stack
- **Three.js** for WebGL rendering
- **React Three Fiber** for React integration
- **@react-three/drei** for utilities and helpers
- **Custom shaders** for galaxy background effects

### State Management
- **React Query** for server state management
- **useState/useEffect** for component state
- **useRef** for DOM manipulation and animations
- **Custom hooks** for API integration

## 📊 API Integration

### NASA APIs
The application integrates with multiple NASA APIs for real-time space data:

#### DONKI (Solar Flares)
```typescript
// API Endpoint
https://api.nasa.gov/DONKI/FLR?startDate=2024-01-01&endDate=2024-12-31&api_key=${API_KEY}

// Data Structure
interface SolarFlare {
  flrID: string;
  beginTime: string;
  peakTime: string;
  endTime: string;
  classType: string;
  sourceLocation: string;
  activeRegionNum: number;
  linkedEvents: string[];
  notes: string;
}
```

#### APOD (Astronomy Picture of the Day)
```typescript
// API Endpoint
https://api.nasa.gov/planetary/apod?api_key=${API_KEY}

// Data Structure
interface APOD {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}
```

### Custom Hooks
```typescript
// useNasaApi.ts
export const useApod = () => {
  return useQuery({
    queryKey: ['apod'],
    queryFn: fetchApod,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    retry: 3,
    refetchOnWindowFocus: false,
  });
};
```

## 🎨 Design System

### Color Palette
```css
:root {
  /* Primary Colors */
  --primary: 210 100% 60%;
  --primary-foreground: 0 0% 98%;
  
  /* Background Colors */
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  
  /* Glassmorphism */
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-blur: blur(16px);
  
  /* Cosmic Gradients */
  --gradient-cosmic: linear-gradient(135deg, #1e3a8a, #7c3aed, #ec4899);
  --gradient-solar: linear-gradient(135deg, #f59e0b, #ef4444, #dc2626);
  --gradient-aurora: linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6);
}
```

### Typography Scale
```css
.text-glow {
  text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}

.text-cosmic {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Responsive Breakpoints
```typescript
// tailwind.config.ts
screens: {
  'xs': '475px',
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
  '3xl': '1600px',
  '4xl': '1920px',
  '5xl': '2560px',
}
```

## 🎮 Interactive Components

### Galaxy Background
```typescript
// Galaxy.tsx - WebGL-based starfield
const Galaxy = ({ 
  density = 2.0,
  glowIntensity = 0.8,
  saturation = 1.0,
  twinkleIntensity = 0.3,
  rotationSpeed = 0.05,
  repulsionStrength = 2.0,
  starSpeed = 0.2,
  speed = 0.3
}) => {
  // WebGL shader implementation
  // Mouse parallax effects
  // Fallback CSS animation
};
```

### Particle Systems
```typescript
// Interactive particle animations
const ParticleSystem = ({ 
  type: 'cosmic' | 'solar' | 'aurora',
  isActive: boolean,
  mousePosition: Vector2
}) => {
  // Canvas-based particle physics
  // Mouse interaction
  // Stage-specific behaviors
};
```

### Story Components

#### Traditional Stories
- **StoryPage.tsx**: Full-featured story viewer
- **Author profiles** and engagement metrics
- **Related stories** and recommendations
- **Social sharing** and comments

#### Hybrid Stories
- **HybridStory.tsx**: Scrollable + interactive
- **Canvas animations** in specific sections
- **Mouse interactions** with particle systems
- **Table of contents** navigation

#### Immersive Stories
- **ImmersiveStory.tsx**: Full-screen 3D
- **React Three Fiber** integration
- **Advanced particle systems**
- **Web Audio API** for ambient sounds

#### Solar Flare Journey
- **SolarFlareStory.tsx**: Educational narrative
- **5-stage journey**: Sun → Space → Astronauts → Earth → Aurora
- **Interactive demonstrations** of each stage
- **Real-time particle physics**

## 🚀 Performance Optimization

### React Query Configuration
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});
```

### Lazy Loading
```typescript
// Code splitting with React.lazy
const DonkiSection = lazy(() => import('@/components/DonkiSection'));
const ApodSection = lazy(() => import('@/components/ApodSection'));

// Suspense wrapper
<Suspense fallback={<LoadingSpinner />}>
  <DonkiSection />
</Suspense>
```

### WebGL Optimization
```typescript
// Context loss handling
canvas.addEventListener('webglcontextlost', (event) => {
  event.preventDefault();
  // Fallback to CSS animation
});

canvas.addEventListener('webglcontextrestored', () => {
  // Reinitialize WebGL
});
```

## 🔧 Development Workflow

### Component Structure
```typescript
// Standard component template
interface ComponentProps {
  // Props interface
}

const Component: React.FC<ComponentProps> = ({ ...props }) => {
  // Hooks
  const [state, setState] = useState();
  const ref = useRef<HTMLDivElement>(null);
  
  // Effects
  useEffect(() => {
    // Side effects
  }, []);
  
  // Event handlers
  const handleEvent = () => {
    // Event logic
  };
  
  // Render
  return (
    <div className="component-container">
      {/* JSX content */}
    </div>
  );
};

export default Component;
```

### Error Handling
```typescript
// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### API Error Handling
```typescript
const useNasaApi = () => {
  return useQuery({
    queryKey: ['nasa-data'],
    queryFn: fetchNasaData,
    retry: (failureCount, error) => {
      if (error.status === 404) return false;
      return failureCount < 3;
    },
    onError: (error) => {
      console.error('NASA API Error:', error);
      // Log to monitoring service
    },
  });
};
```

## 📱 Responsive Design

### Mobile-First Approach
```css
/* Base styles for mobile */
.component {
  padding: 1rem;
  font-size: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .component {
    padding: 1.5rem;
    font-size: 1.125rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .component {
    padding: 2rem;
    font-size: 1.25rem;
  }
}
```

### Touch Interactions
```typescript
// Touch-friendly interactions
const handleTouchStart = (event: TouchEvent) => {
  const touch = event.touches[0];
  setMousePosition({
    x: touch.clientX,
    y: touch.clientY
  });
};
```

## 🧪 Testing Strategy

### Unit Tests
```typescript
// Component testing
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const TestWrapper = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

test('renders component correctly', () => {
  render(<Component />, { wrapper: TestWrapper });
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

### Integration Tests
```typescript
// API integration testing
test('fetches NASA data successfully', async () => {
  const mockData = { /* mock API response */ };
  fetchMock.mockResponseOnce(JSON.stringify(mockData));
  
  const { result } = renderHook(() => useApod(), {
    wrapper: TestWrapper
  });
  
  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockData);
  });
});
```

## 🚀 Deployment

### Build Process
```bash
# Production build
npm run build

# Preview build
npm run preview

# Type checking
npm run type-check
```

### Environment Configuration
```typescript
// Environment variables
const config = {
  apiKey: import.meta.env.VITE_NASA_API_KEY,
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.nasa.gov',
  environment: import.meta.env.MODE,
};
```

### Performance Monitoring
```typescript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 🔮 Future Enhancements

### Planned Features
- **WebXR Support**: VR/AR experiences for immersive stories
- **Real-time Collaboration**: Multi-user story creation
- **AI Integration**: Automated story generation from NASA data
- **Progressive Web App**: Offline functionality and push notifications
- **Advanced 3D**: More sophisticated particle systems and shaders

### Technical Improvements
- **Server-Side Rendering**: Next.js migration for better SEO
- **GraphQL**: More efficient data fetching
- **WebAssembly**: High-performance calculations
- **Service Workers**: Advanced caching strategies

---

This documentation serves as a comprehensive guide for developers working on the AeroStory project. For specific implementation details, refer to the source code and inline comments.