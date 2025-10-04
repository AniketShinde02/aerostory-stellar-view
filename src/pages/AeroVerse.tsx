import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Sphere, MeshDistortMaterial, Float, Text3D, Center, Environment, Sparkles as DreiSparkles, Trail } from "@react-three/drei";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, Maximize2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Suspense, useState } from "react";
import * as THREE from "three";

// Animated cosmic sphere
const CosmicSphere = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 64, 64]} scale={2}>
        <MeshDistortMaterial
          color="#a78bfa"
          attach="material"
          distort={0.6}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

// Morphing energy rings
const EnergyRing = ({ position, color, size }: { position: [number, number, number], color: string, size: number }) => {
  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={1}>
      <Trail width={2} length={8} color={new THREE.Color(color)} attenuation={(t) => t * t}>
        <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[size, 0.1, 16, 100]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2}
            transparent
            opacity={0.6}
          />
        </mesh>
      </Trail>
    </Float>
  );
};

// Particle field with cosmic dust
const CosmicParticles = () => {
  return (
    <>
      <DreiSparkles
        count={500}
        scale={15}
        size={2}
        speed={0.4}
        color="#a78bfa"
      />
      <DreiSparkles
        count={300}
        scale={10}
        size={3}
        speed={0.6}
        color="#f472b6"
      />
    </>
  );
};

// 3D Text
const AeroVerseText = () => {
  return (
    <Center>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={0.5}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.01}
          bevelSegments={5}
        >
          AeroVerse
          <meshStandardMaterial
            color="#a78bfa"
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </Text3D>
      </Float>
    </Center>
  );
};

// Main 3D Scene
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#a78bfa" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#f472b6" />
      <spotLight position={[0, 10, 0]} intensity={0.8} color="#60a5fa" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0.5} fade speed={1} />
      <CosmicParticles />
      
      <CosmicSphere />
      <EnergyRing position={[0, 0, 0]} color="#a78bfa" size={3} />
      <EnergyRing position={[0, 0, 0]} color="#f472b6" size={4} />
      <EnergyRing position={[0, 0, 0]} color="#60a5fa" size={5} />
      
      <Environment preset="night" />
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
        maxDistance={15}
        minDistance={3}
      />
    </>
  );
};

const AeroVerse = () => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const features = [
    {
      title: "Interactive 3D Universe",
      description: "Navigate through a cosmic landscape with real-time physics and lighting",
      delay: 0.2
    },
    {
      title: "Morphing Geometries",
      description: "Watch as celestial objects transform and evolve before your eyes",
      delay: 0.4
    },
    {
      title: "Particle Systems",
      description: "Experience thousands of particles creating cosmic dust and stellar phenomena",
      delay: 0.6
    },
    {
      title: "Dynamic Lighting",
      description: "Multi-colored light sources simulate the energies of distant stars",
      delay: 0.8
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Fixed Navigation */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/20 backdrop-blur-md border-b border-border/50"
      >
        <div className="container mx-auto px-4 xs:px-6 sm:px-8 py-3 xs:py-4 flex items-center justify-between">
          <h1 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-glow">AeroVerse</h1>
          <div className="flex gap-2 xs:gap-3">
            <Button
              onClick={toggleFullscreen}
              variant="outline"
              size="icon"
              className="border-primary/50 hover:border-primary hover:bg-primary/10 w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10"
            >
              <Maximize2 className="h-3 w-3 xs:h-4 xs:w-4" />
            </Button>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="border-primary/50 hover:border-primary hover:bg-primary/10 text-xs xs:text-sm px-2 xs:px-3 py-1.5 xs:py-2"
            >
              <Home className="mr-1 xs:mr-2 h-3 w-3 xs:h-4 xs:w-4" />
              <span className="hidden xs:inline">Back to Home</span>
              <span className="xs:hidden">Home</span>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* 3D Canvas */}
      <div className="fixed inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Feature Cards Overlay */}
      <div className="relative z-10 min-h-screen flex items-end pb-12 xs:pb-16 sm:pb-20 lg:pb-24">
        <div className="container mx-auto px-4 xs:px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay }}
                className="bg-card/30 backdrop-blur-md border border-primary/20 rounded-lg xs:rounded-xl p-4 xs:p-5 sm:p-6 hover:border-primary/50 hover:bg-card/40 transition-all duration-300 hover:shadow-[var(--glow-primary)]"
              >
                <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-primary mb-2 xs:mb-3">{feature.title}</h3>
                <p className="text-xs xs:text-sm text-foreground/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 xs:mt-8 text-center px-4 xs:px-0"
          >
            <p className="text-foreground/60 text-xs xs:text-sm leading-relaxed">
              Click and drag to rotate • Scroll to zoom • Experience the cosmos in 3D
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AeroVerse;
