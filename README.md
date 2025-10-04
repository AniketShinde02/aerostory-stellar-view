# AeroStory - Stellar View

A cutting-edge space weather storytelling platform that combines real-time NASA data with immersive 3D experiences and interactive narratives about cosmic phenomena. Built for the NASA Space Apps Challenge 2025.

## 🌌 Project Overview

AeroStory is a React-based web application that brings space weather to life through interactive storytelling, real-time data visualization, and immersive 3D experiences. The platform educates users about solar flares, auroras, cosmic rays, and other space weather phenomena through engaging narratives and visual effects.

**Featured Story**: "Sunny the Solar Flare's Adventure — Through the Eyes of Earthlings" - An immersive 3D journey following a solar flare from the Sun to Earth, experiencing its effects on farmers, pilots, astronauts, and creating beautiful auroras.

## 🚀 Features

### 📊 Real-Time NASA Data Integration
- **DONKI Solar Flares**: Live solar flare data from NASA's Space Weather Database
- **APOD (Astronomy Picture of the Day)**: Daily cosmic images with detailed explanations
- **Space Weather Impact**: Real-world effects of space weather on technology and humans
- **Near Earth Objects**: Tracking of asteroids and comets

### 🎮 Interactive Storytelling
- **Sunny's Adventure**: Complete 3D interactive storytelling experience with video integration
- **Point-to-Point Learning**: Clean, minimal UI with numbered key points for easy understanding
- **Video Integration**: High-quality video content from NASA Space Apps Challenge
- **Educational Focus**: Scientific accuracy with engaging visual presentation

### 🎨 Visual Effects
- **Galaxy Background**: WebGL-based starfield with mouse parallax effects
- **Particle Systems**: Interactive particle animations for different cosmic phenomena
- **Glassmorphism Design**: Modern UI with backdrop blur and transparency effects
- **Responsive Layout**: Optimized for all screen sizes from mobile to ultrawide

### 🔬 Educational Content
- **Scientific Accuracy**: Content verified by space weather researchers
- **Progressive Disclosure**: Complex information presented in digestible formats
- **Visual Learning**: Interactive elements that demonstrate cosmic concepts
- **Real-Time Updates**: Live data that reflects current space weather conditions

## 🛠️ Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui with Radix UI primitives
- **3D Graphics**: Three.js with React Three Fiber
- **Data Fetching**: TanStack React Query with caching and error handling
- **Routing**: React Router DOM v7 with future flags
- **Animations**: Framer Motion and custom CSS animations
- **WebGL**: Custom shaders for galaxy background and particle effects

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Navigation.tsx  # Main navigation with glassmorphism
│   ├── Hero.tsx        # Landing page hero section
│   ├── Galaxy.tsx      # WebGL galaxy background
│   ├── DonkiSection.tsx # Solar flare data display
│   ├── ApodSection.tsx # Astronomy picture of the day
│   └── ...
├── pages/              # Main application pages
│   ├── Index.tsx       # Homepage with all sections
│   ├── Stories.tsx     # Stories listing page with featured story
│   ├── SunnyAdventureStory.tsx # Featured Sunny story with video and key points
│   ├── StoryPage.tsx   # Traditional story viewer
│   ├── SunnyStory.tsx  # Original Sunny story implementation
│   └── AeroVerse.tsx   # 3D space exploration
├── hooks/              # Custom React hooks
│   └── useNasaApi.ts   # NASA API integration
├── lib/                # Utility functions
└── assets/             # Static assets and images
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- NASA API key (optional, for real-time data)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd aerostory-stellar-view

# Install dependencies
npm install

# Create environment file
echo "VITE_NASA_API_KEY=your_api_key_here" > .env

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_NASA_API_KEY=your_nasa_api_key_here
```

Get your free NASA API key at: https://api.nasa.gov/

## 📖 Story Types

### 📚 Traditional Stories
- Classic text-based narratives
- Rich content with images and metadata
- Author profiles and engagement features
- Related stories and recommendations

### 🎮 Hybrid Stories
- Scrollable content with interactive elements
- Canvas-based particle animations
- Mouse-interactive effects
- Stage-specific visual themes

### 🌌 Immersive Stories
- Full-screen 3D experiences
- React Three Fiber integration
- Advanced particle systems
- Web Audio API for ambient sounds

### ☀️ Solar Flare Journey
- Step-by-step cosmic journey
- Real-time particle physics
- Educational content about space weather
- Interactive demonstrations of effects

## 🎯 Key Features

### Real-Time Data
- **Solar Flares**: Live updates from NASA DONKI API
- **Space Weather**: Current conditions and forecasts
- **Astronomy**: Daily images and explanations
- **Near Earth Objects**: Asteroid and comet tracking

### Interactive Elements
- **Mouse Parallax**: Galaxy background responds to cursor movement
- **Particle Systems**: Dynamic animations based on story content
- **Scroll Triggers**: Animations activate based on scroll position
- **Audio Integration**: Ambient sounds for immersive experiences

### Responsive Design
- **Mobile First**: Optimized for all screen sizes
- **Breakpoints**: xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl
- **Touch Support**: Gesture-friendly interactions
- **Performance**: Optimized loading and rendering

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality checks

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🌟 Acknowledgments

- NASA for providing free APIs and data
- React Three Fiber community for 3D graphics support
- shadcn/ui for beautiful component library
- Tailwind CSS for utility-first styling

## 🔗 Links

- **Live Demo**: [Deployed URL]
- **Documentation**: [Documentation URL]
- **NASA APIs**: https://api.nasa.gov/
- **React Three Fiber**: https://github.com/pmndrs/react-three-fiber

---

Built with ❤️ for space enthusiasts and cosmic storytellers.