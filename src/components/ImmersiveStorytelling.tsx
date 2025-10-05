import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Html, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Audio Context for SFX
const AudioContext = React.createContext<AudioContext | null>(null);

// Mouse-based particle system
const MouseParticles: React.FC<{ mousePosition: THREE.Vector2 }> = ({ mousePosition }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particlesRef = useRef<THREE.Group>(null);
  const [particles, setParticles] = useState<THREE.Vector3[]>([]);

  useEffect(() => {
    // Create 1000 particles
    const newParticles = Array.from({ length: 1000 }, () => 
      new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      )
    );
    setParticles(newParticles);
  }, []);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      // Update particle positions based on mouse
      particlesRef.current.children.forEach((particle, index) => {
        const pos = particles[index];
        if (pos) {
          // Create mouse attraction effect
          const mouseInfluence = new THREE.Vector2(
            (mousePosition.x - 0.5) * 20,
            (mousePosition.y - 0.5) * 20
          );
          
          // Add subtle movement
          pos.x += Math.sin(state.clock.elapsedTime + index * 0.1) * 0.1;
          pos.y += Math.cos(state.clock.elapsedTime + index * 0.1) * 0.1;
          pos.z += Math.sin(state.clock.elapsedTime * 0.5 + index * 0.05) * 0.05;
          
          // Apply mouse influence
          pos.x += mouseInfluence.x * 0.01;
          pos.y += mouseInfluence.y * 0.01;
          
          particle.position.copy(pos);
          
          // Add twinkling effect
          const scale = 0.5 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.3;
          particle.scale.setScalar(scale);
        }
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((pos, index) => (
        <mesh key={index} position={pos}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial 
            color={`hsl(${(index * 0.36) % 360}, 70%, 60%)`}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

// Animated text that responds to mouse
const InteractiveText: React.FC<{ 
  children: string; 
  position: [number, number, number];
  mousePosition: THREE.Vector2;
}> = ({ children, position, mousePosition }) => {
  const textRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (textRef.current) {
      // Gentle floating animation
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
      
      // Mouse interaction
      const mouseInfluence = new THREE.Vector2(
        (mousePosition.x - 0.5) * 0.5,
        (mousePosition.y - 0.5) * 0.5
      );
      
      textRef.current.rotation.x = mouseInfluence.y * 0.1;
      textRef.current.rotation.y = mouseInfluence.x * 0.1;
    }
  });

  return (
    <group ref={textRef} position={position}>
      <Text
        fontSize={2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
        outlineWidth={0.1}
        outlineColor="#000000"
      >
        {children}
      </Text>
    </group>
  );
};

// Animated 3D elements
const AnimatedElements: React.FC<{ mousePosition: THREE.Vector2 }> = ({ mousePosition }) => {
  const elementsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (elementsRef.current) {
      // Rotate entire group
      elementsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      
      // Mouse interaction
      const mouseInfluence = new THREE.Vector2(
        (mousePosition.x - 0.5) * 0.5,
        (mousePosition.y - 0.5) * 0.5
      );
      
      elementsRef.current.rotation.x = mouseInfluence.y * 0.2;
      elementsRef.current.rotation.z = mouseInfluence.x * 0.1;
    }
  });

  return (
    <group ref={elementsRef}>
      {/* Floating geometric shapes */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} position={[
          Math.cos(i / 8 * Math.PI * 2) * 15,
          Math.sin(i / 8 * Math.PI * 2) * 5,
          Math.sin(i / 8 * Math.PI * 2) * 10
        ]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color={`hsl(${i * 45}, 70%, 60%)`}
            transparent
            opacity={0.7}
            emissive={`hsl(${i * 45}, 70%, 20%)`}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
      
      {/* Orbiting rings */}
      {Array.from({ length: 3 }, (_, i) => (
        <mesh key={`ring-${i}`} position={[0, 0, i * 5]}>
          <torusGeometry args={[8 + i * 2, 0.2, 16, 100]} />
          <meshStandardMaterial 
            color={`hsl(${120 + i * 60}, 70%, 60%)`}
            transparent
            opacity={0.5}
            emissive={`hsl(${120 + i * 60}, 70%, 10%)`}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

// Main 3D Scene
const StoryScene: React.FC<{ 
  storyContent: string[];
  mousePosition: THREE.Vector2;
}> = ({ storyContent, mousePosition }) => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} color="#4a90e2" intensity={0.5} />
      
      {/* Mouse Particles */}
      <MouseParticles mousePosition={mousePosition} />
      
      {/* Interactive Text */}
      {storyContent.map((text, index) => (
        <InteractiveText
          key={index}
          position={[0, index * 3, 0]}
          mousePosition={mousePosition}
        >
          {text}
        </InteractiveText>
      ))}
      
      {/* Animated Elements */}
      <AnimatedElements mousePosition={mousePosition} />
      
      {/* Environment */}
      <Environment preset="night" />
    </>
  );
};

// Audio Manager
const useAudioManager = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const initAudio = async () => {
      try {
        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(context);
      } catch (error) {
        console.warn('Web Audio API not supported');
      }
    };

    initAudio();
  }, []);

  const playAmbientSound = useCallback(async () => {
    if (!audioContext) return;

    try {
      // Create ambient sound with oscillators
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();

      oscillator1.type = 'sine';
      oscillator1.frequency.setValueAtTime(220, audioContext.currentTime);
      
      oscillator2.type = 'triangle';
      oscillator2.frequency.setValueAtTime(330, audioContext.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, audioContext.currentTime);

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

      oscillator1.connect(filter);
      oscillator2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator1.start();
      oscillator2.start();

      // Create gentle modulation
      oscillator1.frequency.exponentialRampToValueAtTime(
        440, audioContext.currentTime + 10
      );
      oscillator2.frequency.exponentialRampToValueAtTime(
        660, audioContext.currentTime + 10
      );

      setIsPlaying(true);

      // Stop after 10 seconds
      setTimeout(() => {
        oscillator1.stop();
        oscillator2.stop();
        setIsPlaying(false);
      }, 10000);

    } catch (error) {
      console.warn('Could not play ambient sound:', error);
    }
  }, [audioContext]);

  const playTransitionSound = useCallback(async () => {
    if (!audioContext) return;

    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);

    } catch (error) {
      console.warn('Could not play transition sound:', error);
    }
  }, [audioContext]);

  return { playAmbientSound, playTransitionSound, isPlaying };
};

// Main Component
interface ImmersiveStorytellingProps {
  storyData: {
    title: string;
    content: string[];
    backgroundMusic?: string;
    soundEffects?: string[];
  };
  className?: string;
}

const ImmersiveStorytelling: React.FC<ImmersiveStorytellingProps> = ({ 
  storyData, 
  className = "" 
}) => {
  const [mousePosition, setMousePosition] = useState(new THREE.Vector2(0.5, 0.5));
  const [currentScene, setCurrentScene] = useState(0);
  const { playAmbientSound, playTransitionSound, isPlaying } = useAudioManager();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        setMousePosition(new THREE.Vector2(x, y));
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Scene transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % storyData.content.length);
      playTransitionSound();
    }, 8000);

    return () => clearInterval(interval);
  }, [storyData.content.length, playTransitionSound]);

  // Start ambient sound on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isPlaying) {
        playAmbientSound();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [playAmbientSound, isPlaying]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden ${className}`}
    >
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        style={{ background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)' }}
      >
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        
        <StoryScene 
          storyContent={[storyData.title, ...storyData.content.slice(0, 3)]}
          mousePosition={mousePosition}
        />
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Progress indicator */}
        <div className="absolute top-8 left-8 right-8">
          <div className="flex space-x-2">
            {storyData.content.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  index === currentScene 
                    ? 'bg-white' 
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scene content */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              {storyData.title}
            </h2>
            <p className="text-xl text-white/90 leading-relaxed drop-shadow-lg">
              {storyData.content[currentScene]}
            </p>
          </div>
        </div>

        {/* Interactive elements */}
        <div className="absolute top-8 right-8">
          <button
            onClick={playAmbientSound}
            className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 hover:bg-white/30 transition-all duration-300"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.814L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.814a1 1 0 011-.11zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Mouse interaction indicator */}
        <div 
          className="absolute w-4 h-4 bg-white/50 rounded-full pointer-events-none transition-all duration-100"
          style={{
            left: `${mousePosition.x * 100}%`,
            top: `${mousePosition.y * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>
    </div>
  );
};

export default ImmersiveStorytelling;
