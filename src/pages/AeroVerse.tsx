import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Environment, Sphere, MeshDistortMaterial, Float, Text, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, Maximize2, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Suspense, useState, useRef } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const AnimatedSphere = ({ position, color, speed }: { position: [number, number, number], color: string, speed: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <Sphere args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color={color}
            attach="material"
            distort={0.6}
            speed={speed}
            roughness={0.1}
            metalness={0.8}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </Sphere>
      </mesh>
    </Float>
  );
};

const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 5000;

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 30;
    positions[i3 + 1] = (Math.random() - 0.5) * 30;
    positions[i3 + 2] = (Math.random() - 0.5) * 30;

    const color = new THREE.Color();
    color.setHSL(Math.random() * 0.3 + 0.5, 0.8, 0.6);
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors sizeAttenuation transparent opacity={0.8} blending={THREE.AdditiveBlending} />
    </points>
  );
};

const EnergyRing = ({ radius, color, position }: { radius: number, color: string, position: [number, number, number] }) => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={ringRef} position={position} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.1, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    <>
      <color attach="background" args={['#000510']} />
      <fog attach="fog" args={['#000510', 15, 40]} />

      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff006e" />
      <spotLight position={[0, 15, 0]} angle={0.5} penumbra={1} intensity={1.5} color="#9b5de5" />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0.8} fade speed={1} />

      <ParticleField />

      <AnimatedSphere position={[0, 0, 0]} color="#00d4ff" speed={0.5} />
      <AnimatedSphere position={[-5, 2, -3]} color="#9b5de5" speed={0.7} />
      <AnimatedSphere position={[5, -2, -3]} color="#ff006e" speed={0.6} />

      <EnergyRing radius={4} color="#00d4ff" position={[0, 0, 0]} />
      <EnergyRing radius={5} color="#9b5de5" position={[0, 0, 0]} />
      <EnergyRing radius={6} color="#ff006e" position={[0, 0, 0]} />

      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          position={[0, 4, -2]}
          fontSize={0.8}
          color="#00d4ff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/raleway/v28/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCIPrE.woff"
        >
          AEROVERSE
        </Text>
      </Float>

      <Environment preset="night" />
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
        maxDistance={20}
        minDistance={3}
      />

      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </>
  );
};

const AeroVerse = () => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/20 backdrop-blur-md border-b border-border/50"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-glow">AeroVerse</h1>
          <div className="flex gap-3">
            <Button
              onClick={toggleFullscreen}
              variant="outline"
              size="icon"
              className="border-primary/50 hover:border-primary hover:bg-primary/10"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="border-primary/50 hover:border-primary hover:bg-primary/10"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="fixed inset-0">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 75 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 left-8 z-40"
      >
        <Button
          onClick={() => setShowInfo(!showInfo)}
          variant="outline"
          size="lg"
          className="border-cyan-500/50 hover:border-cyan-500 bg-background/20 backdrop-blur-md hover:bg-background/30 text-cyan-400"
        >
          <Info className="mr-2 h-5 w-5" />
          {showInfo ? 'Hide' : 'Show'} Info
        </Button>
      </motion.div>

      {showInfo && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 left-8 right-8 z-30 max-w-4xl mx-auto"
        >
          <div className="bg-background/20 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">Welcome to the AeroVerse</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="text-cyan-400 font-semibold mb-2">Features:</h3>
                <ul className="text-foreground/70 space-y-1">
                  <li>• 5,000+ Interactive Particles</li>
                  <li>• Dynamic Morphing Spheres</li>
                  <li>• Energy Ring Systems</li>
                  <li>• Real-time Lighting & Shadows</li>
                  <li>• Bloom Post-Processing</li>
                  <li>• 3D Text & Holographic UI</li>
                </ul>
              </div>
              <div>
                <h3 className="text-cyan-400 font-semibold mb-2">Controls:</h3>
                <ul className="text-foreground/70 space-y-1">
                  <li>• Click & Drag: Rotate view</li>
                  <li>• Scroll: Zoom in/out</li>
                  <li>• Right-click & Drag: Pan</li>
                  <li>• Auto-rotation enabled</li>
                  <li>• GPU accelerated rendering</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="fixed top-20 right-8 z-30 bg-background/20 backdrop-blur-xl border border-green-500/30 rounded-xl p-4"
      >
        <h4 className="text-green-400 text-sm font-bold mb-2">System Status</h4>
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between gap-4">
            <span className="text-foreground/60">Renderer:</span>
            <span className="text-green-400 font-mono">WebGL 2.0</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-foreground/60">Particles:</span>
            <span className="text-green-400 font-mono">10,000+</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-foreground/60">Status:</span>
            <span className="text-green-400 font-mono">ACTIVE</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AeroVerse;
