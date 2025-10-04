import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GalaxyParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const particlesData = useMemo(() => {
    const count = 50000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    const colorInner = new THREE.Color('#ff6b35');
    const colorMiddle = new THREE.Color('#00d4ff');
    const colorOuter = new THREE.Color('#9b5de5');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 15;
      const spinAngle = radius * 2;
      const branchAngle = ((i % 5) / 5) * Math.PI * 2;

      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInner.clone();
      mixedColor.lerp(colorMiddle, radius / 15);
      mixedColor.lerp(colorOuter, radius / 15);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      scales[i] = Math.random();
    }

    return { positions, colors, scales };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const vertexShader = `
    attribute float scale;
    varying vec3 vColor;

    void main() {
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = scale * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    varying vec3 vColor;

    void main() {
      float strength = distance(gl_PointCoord, vec2(0.5));
      strength = 1.0 - strength;
      strength = pow(strength, 3.0);

      vec3 color = mix(vec3(0.0), vColor, strength);
      gl_FragColor = vec4(color, strength);
    }
  `;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesData.positions.length / 3}
          array={particlesData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesData.colors.length / 3}
          array={particlesData.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={particlesData.scales.length}
          array={particlesData.scales}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
};

export default GalaxyParticles;
