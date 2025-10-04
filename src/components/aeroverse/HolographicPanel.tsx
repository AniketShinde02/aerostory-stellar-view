import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface HolographicPanelProps {
  position: [number, number, number];
  title: string;
  value: string;
  color: string;
}

const HolographicPanel = ({ position, title, value, color }: HolographicPanelProps) => {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7;
    }
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <RoundedBox args={[2, 1, 0.1]} radius={0.05}>
        <meshStandardMaterial
          ref={materialRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </RoundedBox>

      <Text
        position={[0, 0.2, 0.06]}
        fontSize={0.15}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/helvetiker_bold.typeface.json"
      >
        {title}
      </Text>

      <Text
        position={[0, -0.1, 0.06]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/helvetiker_bold.typeface.json"
      >
        {value}
      </Text>

      <mesh position={[0, 0, 0.055]}>
        <planeGeometry args={[1.8, 0.6]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export default HolographicPanel;
