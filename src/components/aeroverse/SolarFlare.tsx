import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SolarFlare = ({ position }: { position: [number, number, number] }) => {
  const particlesRef = useRef<THREE.Points>(null);

  const particlesData = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = Math.random() * 0.05 + 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    return { positions, velocities };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += particlesData.velocities[i];
        positions[i + 1] += particlesData.velocities[i + 1];
        positions[i + 2] += particlesData.velocities[i + 2];

        const distance = Math.sqrt(
          positions[i] ** 2 + positions[i + 1] ** 2 + positions[i + 2] ** 2
        );

        if (distance > 5) {
          positions[i] = (Math.random() - 0.5) * 0.5;
          positions[i + 1] = (Math.random() - 0.5) * 0.5;
          positions[i + 2] = (Math.random() - 0.5) * 0.5;
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const vertexShader = `
    varying vec3 vPosition;

    void main() {
      vPosition = position;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = 50.0 / -mvPosition.z;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    varying vec3 vPosition;

    void main() {
      float dist = length(vPosition);
      vec3 color = mix(vec3(1.0, 1.0, 0.0), vec3(1.0, 0.3, 0.0), dist / 5.0);

      float strength = distance(gl_PointCoord, vec2(0.5));
      strength = 1.0 - strength;
      strength = pow(strength, 3.0);

      gl_FragColor = vec4(color * strength, strength);
    }
  `;

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesData.positions.length / 3}
          array={particlesData.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default SolarFlare;
