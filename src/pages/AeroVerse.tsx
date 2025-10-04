import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Environment, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, Maximize2, Info, Orbit, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import * as THREE from "three";
import GalaxyParticles from "@/components/aeroverse/GalaxyParticles";
import MeshmorphicSphere from "@/components/aeroverse/MeshmorphicSphere";
import NebulaCloud from "@/components/aeroverse/NebulaCloud";
import BlackHole from "@/components/aeroverse/BlackHole";
import SolarFlare from "@/components/aeroverse/SolarFlare";
import CosmicDust from "@/components/aeroverse/CosmicDust";
import PostProcessingEffects from "@/components/aeroverse/PostProcessingEffects";
import HolographicPanel from "@/components/aeroverse/HolographicPanel";


const Scene = () => {
  const [particleCount, setParticleCount] = useState(0);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    setParticleCount(67000);
  }, []);

  return (
    <>
      <color attach="background" args={['#000510']} />
      <fog attach="fog" args={['#000510', 10, 50]} />

      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#00d4ff" castShadow />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff006e" />
      <pointLight position={[0, 15, 0]} intensity={1.8} color="#9b5de5" />
      <spotLight position={[15, 15, 15]} angle={0.3} penumbra={1} intensity={2} color="#00f5ff" castShadow />

      <Stars radius={100} depth={50} count={8000} factor={6} saturation={0.8} fade speed={1.5} />

      <GalaxyParticles />
      <CosmicDust />

      <MeshmorphicSphere position={[0, 0, 0]} />
      <MeshmorphicSphere position={[-8, 2, -3]} />

      <NebulaCloud position={[5, 3, -8]} scale={4} />
      <NebulaCloud position={[-6, -2, -6]} scale={3.5} />
      <NebulaCloud position={[0, 5, -10]} scale={5} />

      <SolarFlare position={[-10, 4, -4]} />
      <SolarFlare position={[12, -3, -7]} />

      <BlackHole />

      <HolographicPanel
        position={[-5, 4, 3]}
        title="PARTICLES"
        value={particleCount.toLocaleString()}
        color="#00d4ff"
      />
      <HolographicPanel
        position={[5, 4, 3]}
        title="FPS"
        value={fps.toString()}
        color="#9b5de5"
      />
      <HolographicPanel
        position={[0, -4, 3]}
        title="STATUS"
        value="ACTIVE"
        color="#ff006e"
      />

      <Environment preset="night" />
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.3}
        maxDistance={25}
        minDistance={2}
        dampingFactor={0.05}
        rotateSpeed={0.5}
      />

      <PostProcessingEffects />
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

  const [showInfo, setShowInfo] = useState(false);

  const features = [
    {
      icon: Zap,
      title: "67,000+ Particles",
      description: "GPU-accelerated particle systems with custom GLSL shaders for maximum performance",
      delay: 0.2
    },
    {
      icon: Orbit,
      title: "Meshmorphic Geometries",
      description: "Real-time vertex displacement with procedural noise and wave functions",
      delay: 0.4
    },
    {
      icon: Zap,
      title: "Dynamic Nebulas",
      description: "Volumetric fog with fractal brownian motion for realistic cosmic clouds",
      delay: 0.6
    },
    {
      icon: Orbit,
      title: "Black Hole Simulation",
      description: "Event horizon with gravitational lensing and accretion disk effects",
      delay: 0.8
    },
    {
      icon: Zap,
      title: "Post-Processing",
      description: "Bloom, chromatic aberration, vignette, and film grain for cinematic quality",
      delay: 1.0
    },
    {
      icon: Orbit,
      title: "Holographic UI",
      description: "Real-time 3D interface elements with transparency and glow effects",
      delay: 1.2
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

      {/* 3D Canvas */}
      <div className="fixed inset-0">
        <Canvas
          shadows
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

      {/* Info Toggle */}
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

      {/* Feature Cards Overlay */}
      {showInfo && (
        <div className="fixed bottom-24 left-8 right-8 z-30 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pointer-events-auto"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: feature.delay }}
                  className="bg-background/20 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-5 hover:border-cyan-500/60 hover:bg-background/30 transition-all duration-300 shadow-[0_0_30px_rgba(0,212,255,0.1)]"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                      <Icon className="h-5 w-5 text-cyan-400" />
                    </div>
                    <h3 className="text-base font-bold text-cyan-300">{feature.title}</h3>
                  </div>
                  <p className="text-xs text-foreground/70 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-6 text-center bg-background/20 backdrop-blur-xl border border-purple-500/30 rounded-xl p-4"
          >
            <p className="text-purple-300 text-sm font-medium mb-1">
              🎮 Interactive Controls
            </p>
            <p className="text-foreground/60 text-xs">
              Click & Drag to Rotate • Scroll to Zoom • Right-Click to Pan • Experience Real-Time GPU Rendering
            </p>
          </motion.div>
        </div>
      )}

      {/* Performance Stats */}
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
            <span className="text-foreground/60">Shaders:</span>
            <span className="text-green-400 font-mono">GLSL ES 3.0</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-foreground/60">Mode:</span>
            <span className="text-green-400 font-mono">GPU Accelerated</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AeroVerse;
