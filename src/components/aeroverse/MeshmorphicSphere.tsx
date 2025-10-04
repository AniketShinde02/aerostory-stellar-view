import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

const WaveMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorA: new THREE.Color('#00d4ff'),
    uColorB: new THREE.Color('#9b5de5'),
    uColorC: new THREE.Color('#ff6b35'),
  },
  `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normal;

      vec3 pos = position;
      float wave1 = sin(pos.x * 2.0 + uTime) * 0.15;
      float wave2 = cos(pos.y * 2.0 + uTime * 1.5) * 0.15;
      float wave3 = sin(pos.z * 2.0 + uTime * 0.8) * 0.15;

      pos += normal * (wave1 + wave2 + wave3);

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  `
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;

    void main() {
      float pattern1 = sin(vPosition.x * 3.0 + uTime) * 0.5 + 0.5;
      float pattern2 = cos(vPosition.y * 3.0 + uTime * 1.3) * 0.5 + 0.5;
      float pattern3 = sin(vPosition.z * 3.0 + uTime * 0.7) * 0.5 + 0.5;

      vec3 color = mix(uColorA, uColorB, pattern1);
      color = mix(color, uColorC, pattern2 * pattern3);

      float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
      color += fresnel * 0.5;

      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ WaveMaterial });

const MeshmorphicSphere = ({ position }: { position: [number, number, number] }) => {
  const materialRef = useRef<any>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[2, 128, 128]} />
      <waveMaterial ref={materialRef} />
    </mesh>
  );
};

export default MeshmorphicSphere;
