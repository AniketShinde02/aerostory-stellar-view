import React, { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Environment, Html, useProgress } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, BookOpen } from 'lucide-react';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Loading component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
        <p className="text-lg">Loading Sunny's Adventure...</p>
        <div className="w-48 bg-gray-700 rounded-full h-2 mt-4">
          <div 
            className="bg-orange-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Html>
  );
}

// Sunny character (animated solar flare)
const SunnyCharacter: React.FC<{ position: [number, number, number]; scale?: number }> = ({ 
  position, 
  scale = 1 
}) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      
      // Waving animation
      meshRef.current.children[0].rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.3;
    }
  });

  return (
    <group ref={meshRef} position={position} scale={scale}>
      {/* Sunny's body (main flare) */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial 
          color="#fca311" 
          emissive="#fca311"
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Sunny's arms (flare extensions) */}
      <mesh position={[0.2, 0, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.05, 0.1, 0.4]} />
        <meshBasicMaterial 
          color="#ff6b35" 
          emissive="#ff6b35"
          emissiveIntensity={0.6}
        />
      </mesh>
      
      <mesh position={[-0.2, 0, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.05, 0.1, 0.4]} />
        <meshBasicMaterial 
          color="#ff6b35" 
          emissive="#ff6b35"
          emissiveIntensity={0.6}
        />
      </mesh>
      
      {/* Sunny's face */}
      <mesh position={[0, 0.1, 0.25]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.03, 0.15, 0.3]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0.03, 0.15, 0.3]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* Mouth */}
      <mesh position={[0, 0.05, 0.3]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
};

// 3D Sun model
const SunModel: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const sunRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={sunRef} position={position}>
      <mesh>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial 
          color="#ff6b35" 
          emissive="#ff6b35"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Solar flares */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh 
          key={i}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 3.5,
            Math.sin((i / 8) * Math.PI * 2) * 3.5,
            0
          ]}
          rotation={[0, 0, (i / 8) * Math.PI * 2]}
        >
          <cylinderGeometry args={[0.1, 0.3, 1.5]} />
          <meshBasicMaterial 
            color="#fca311" 
            emissive="#fca311"
            emissiveIntensity={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
};

// Planet model
const PlanetModel: React.FC<{ 
  position: [number, number, number]; 
  color: string; 
  size: number;
  name?: string;
}> = ({ position, color, size, name }) => {
  const planetRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={planetRef} position={position}>
      <mesh>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {name && (
        <Text
          position={[0, size + 0.5, 0]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      )}
    </group>
  );
};

// ISS Model
const ISSModel: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const issRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (issRef.current) {
      issRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={issRef} position={position}>
      {/* ISS Main body */}
      <mesh>
        <boxGeometry args={[1, 0.3, 0.5]} />
        <meshBasicMaterial 
          color="#c0c0c0" 
          emissive="#c0c0c0"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Solar panels */}
      <mesh position={[0, 0, 0.8]}>
        <boxGeometry args={[0.1, 2, 0.05]} />
        <meshBasicMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[0, 0, -0.8]}>
        <boxGeometry args={[0.1, 2, 0.05]} />
        <meshBasicMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
};

// Aurora effect
const AuroraEffect: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const auroraRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (auroraRef.current) {
      auroraRef.current.children.forEach((child, index) => {
        child.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.5;
        child.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.2;
      });
    }
  });

  return (
    <group ref={auroraRef} position={position}>
      {Array.from({ length: 5 }, (_, i) => (
        <mesh 
          key={i}
          position={[i * 0.5 - 1, 0, 0]}
          rotation={[0, 0, Math.PI / 4]}
        >
          <planeGeometry args={[0.3, 3]} />
          <meshBasicMaterial 
            color={i % 2 === 0 ? "#00ff88" : "#0088ff"}
            emissive={i % 2 === 0 ? "#00ff88" : "#0088ff"}
            emissiveIntensity={0.6}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
};

// Main 3D Scene
const Scene: React.FC<{ sceneNumber: number }> = ({ sceneNumber }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    // Camera animations based on scene
    switch (sceneNumber) {
      case 1:
        gsap.to(camera.position, { duration: 1, x: 0, y: 0, z: 10 });
        gsap.to(camera.rotation, { duration: 1, x: 0, y: 0, z: 0 });
        break;
      case 2:
        gsap.to(camera.position, { duration: 1, x: 5, y: 2, z: 8 });
        break;
      case 3:
        gsap.to(camera.position, { duration: 1.5, x: -8, y: 0, z: 5 });
        break;
      case 4:
        gsap.to(camera.position, { duration: 1, x: 0, y: -3, z: 8 });
        break;
      case 5:
        gsap.to(camera.position, { duration: 1, x: 3, y: 3, z: 6 });
        break;
      case 6:
        gsap.to(camera.position, { duration: 1, x: 0, y: 4, z: 8 });
        break;
      case 7:
        gsap.to(camera.position, { duration: 1, x: -5, y: -2, z: 10 });
        break;
      case 8:
        gsap.to(camera.position, { duration: 1, x: 0, y: -4, z: 12 });
        break;
      case 9:
        gsap.to(camera.position, { duration: 1, x: 0, y: 0, z: 15 });
        break;
      case 10:
        gsap.to(camera.position, { duration: 2, x: 0, y: 0, z: 25 });
        break;
    }
  }, [sceneNumber, camera]);

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff6b35" />
      
      {/* Scene 1: Sun & Sunny */}
      {sceneNumber >= 1 && (
        <>
          <SunModel position={[0, 0, 0]} />
          <SunnyCharacter position={[2, 0, 0]} scale={0.8} />
        </>
      )}
      
      {/* Scene 2: Space Weather */}
      {sceneNumber >= 2 && (
        <>
          <SunModel position={[-8, 0, 0]} />
          <PlanetModel position={[8, 0, 0]} color="#4a90e2" size={1} name="Earth" />
          <PlanetModel position={[5, 0, 0]} color="#ffa500" size={0.7} name="Mars" />
        </>
      )}
      
      {/* Scene 3: Journey to Earth */}
      {sceneNumber >= 3 && (
        <>
          <PlanetModel position={[-6, 0, 0]} color="#ff6b35" size={0.5} name="Mercury" />
          <PlanetModel position={[-3, 0, 0]} color="#ffa500" size={0.8} name="Venus" />
          <PlanetModel position={[0, 0, 0]} color="#4a90e2" size={1} name="Earth" />
          <SunnyCharacter position={[-2, 0, 0]} scale={0.6} />
        </>
      )}
      
      {/* Scene 4: Farmers */}
      {sceneNumber >= 4 && (
        <>
          <PlanetModel position={[0, 0, 0]} color="#4a90e2" size={1} name="Earth" />
          <SunnyCharacter position={[0, 2, 0]} scale={0.7} />
        </>
      )}
      
      {/* Scene 5: Pilots */}
      {sceneNumber >= 5 && (
        <>
          <mesh position={[0, 2, 0]}>
            <boxGeometry args={[2, 0.3, 0.5]} />
            <meshBasicMaterial color="#c0c0c0" />
          </mesh>
          <SunnyCharacter position={[3, 2, 0]} scale={0.6} />
        </>
      )}
      
      {/* Scene 6: Astronauts */}
      {sceneNumber >= 6 && (
        <>
          <ISSModel position={[0, 0, 0]} />
          <SunnyCharacter position={[2, 0, 0]} scale={0.5} />
        </>
      )}
      
      {/* Scene 7: Power Grid */}
      {sceneNumber >= 7 && (
        <>
          <PlanetModel position={[0, 0, 0]} color="#4a90e2" size={1} name="Earth" />
          <SunnyCharacter position={[0, 3, 0]} scale={0.8} />
        </>
      )}
      
      {/* Scene 8: Kids & Auroras */}
      {sceneNumber >= 8 && (
        <>
          <PlanetModel position={[0, 0, 0]} color="#4a90e2" size={1} name="Earth" />
          <AuroraEffect position={[0, 2, 0]} />
          <SunnyCharacter position={[0, 1, 0]} scale={0.6} />
        </>
      )}
      
      {/* Scene 9: Scientists */}
      {sceneNumber >= 9 && (
        <>
          <SunModel position={[-5, 0, 0]} />
          <PlanetModel position={[5, 0, 0]} color="#4a90e2" size={1} name="Earth" />
          <SunnyCharacter position={[0, 0, 0]} scale={0.5} />
        </>
      )}
      
      {/* Scene 10: Ending */}
      {sceneNumber >= 10 && (
        <>
          <SunModel position={[-10, 0, 0]} />
          <PlanetModel position={[-6, 0, 0]} color="#ff6b35" size={0.5} name="Mercury" />
          <PlanetModel position={[-3, 0, 0]} color="#ffa500" size={0.8} name="Venus" />
          <PlanetModel position={[0, 0, 0]} color="#4a90e2" size={1} name="Earth" />
          <PlanetModel position={[3, 0, 0]} color="#ffa500" size={0.7} name="Mars" />
          <SunnyCharacter position={[0, 0, 0]} scale={0.4} />
        </>
      )}
      
      {/* Stars */}
      <mesh>
        <sphereGeometry args={[100, 32, 32]} />
        <meshBasicMaterial 
          color="#0b0f25" 
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
};

// Text overlay component
const TextOverlay: React.FC<{ 
  title: string; 
  subtitle: string; 
  isVisible: boolean;
  className?: string;
}> = ({ title, subtitle, isVisible, className = "" }) => {
  return (
    <div 
      className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${className}`}
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className="text-center max-w-4xl px-8">
        <h2 
          className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500"
          style={{ fontFamily: 'Orbitron, monospace' }}
        >
          {title}
        </h2>
        <p 
          className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
};

// Main component
const SunnyStory: React.FC = () => {
  const [currentScene, setCurrentScene] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const scenes = [
    {
      title: "Meet Sunny",
      subtitle: "A friendly solar flare who's about to take you on an amazing journey through space!"
    },
    {
      title: "What is Space Weather?",
      subtitle: "Solar flares, coronal mass ejections, and solar wind create space weather that affects our planet."
    },
    {
      title: "Journey to Earth",
      subtitle: "Sunny travels 93 million miles through the solar system, past Mercury, Venus, and finally reaching Earth."
    },
    {
      title: "Farmers & GPS",
      subtitle: "GPS signals can be disrupted by space weather, affecting farmers who rely on precision agriculture."
    },
    {
      title: "Pilots & Radio",
      subtitle: "High-altitude flights experience radio communication disruptions during solar storms."
    },
    {
      title: "Astronauts & Radiation",
      subtitle: "Astronauts on the ISS must take shelter during intense solar radiation events."
    },
    {
      title: "Power Grid Impact",
      subtitle: "Electric power grids can experience surges and outages during geomagnetic storms."
    },
    {
      title: "Auroras & Wonder",
      subtitle: "The beautiful auroras dancing in the sky are caused by Sunny's particles interacting with Earth's atmosphere."
    },
    {
      title: "Scientists & Monitoring",
      subtitle: "Space weather scientists work around the clock to monitor and predict solar activity."
    },
    {
      title: "We're All Connected",
      subtitle: "Even the Sun's wildest storms connect us all in this cosmic dance of energy and light."
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scroll triggers for each scene
    scenes.forEach((_, index) => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: `${index * 100}% top`,
        end: `${(index + 1) * 100}% top`,
        onEnter: () => setCurrentScene(index + 1),
        onEnterBack: () => setCurrentScene(index + 1),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleExploreSpaceWeather = () => {
    // Scroll to the stories section or open educational resources
    const element = document.getElementById('stories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f25] via-[#1e244f] to-[#0b0f25]">
      <Navigation />
      
      {/* Fixed 3D Canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <Suspense fallback={<Loader />}>
            <Environment preset="night" />
            <Scene sceneNumber={currentScene} />
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Scrollable content */}
      <div ref={containerRef} className="relative z-10">
        {scenes.map((scene, index) => (
          <div 
            key={index}
            className="h-screen flex items-center justify-center"
          >
            <TextOverlay
              title={scene.title}
              subtitle={scene.subtitle}
              isVisible={currentScene === index + 1}
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="fixed bottom-8 left-8 z-20 flex gap-4">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          variant="outline"
          size="lg"
          className="bg-black/50 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>
        
        <Button
          onClick={() => setIsMuted(!isMuted)}
          variant="outline"
          size="lg"
          className="bg-black/50 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
      </div>

      {/* Progress indicator */}
      <div className="fixed top-1/2 right-8 z-20 transform -translate-y-1/2">
        <div className="flex flex-col gap-2">
          {scenes.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentScene === index + 1 
                  ? 'bg-orange-400 scale-125' 
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Ending CTA */}
      {currentScene === 10 && (
        <div className="fixed bottom-8 right-8 z-20">
          <Button
            onClick={handleExploreSpaceWeather}
            size="lg"
            className="bg-gradient-to-r from-orange-400 to-yellow-400 text-black font-bold px-8 py-4 hover:from-orange-500 hover:to-yellow-500 transition-all duration-300"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Explore Space Weather
          </Button>
        </div>
      )}

    </div>
  );
};

export default SunnyStory;
