import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

const NebulaMaterial = shaderMaterial(
  {
    uTime: 0,
    uDensity: 0.3,
    uColor1: new THREE.Color('#ff006e'),
    uColor2: new THREE.Color('#8338ec'),
    uColor3: new THREE.Color('#00d4ff'),
  },
  `
    varying vec3 vPosition;
    varying vec2 vUv;

    void main() {
      vPosition = position;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float uTime;
    uniform float uDensity;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec3 vPosition;
    varying vec2 vUv;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    float noise(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);

      float n = i.x + i.y * 57.0 + 113.0 * i.z;
      return mix(
        mix(mix(random(vec2(n + 0.0, 0.0)), random(vec2(n + 1.0, 0.0)), f.x),
            mix(random(vec2(n + 57.0, 0.0)), random(vec2(n + 58.0, 0.0)), f.x), f.y),
        mix(mix(random(vec2(n + 113.0, 0.0)), random(vec2(n + 114.0, 0.0)), f.x),
            mix(random(vec2(n + 170.0, 0.0)), random(vec2(n + 171.0, 0.0)), f.x), f.y), f.z);
    }

    float fbm(vec3 p) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;

      for(int i = 0; i < 6; i++) {
        value += amplitude * noise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    void main() {
      vec3 pos = vPosition + vec3(uTime * 0.1);
      float density = fbm(pos * 0.5);

      density = smoothstep(0.3, 0.7, density);

      vec3 color = mix(uColor1, uColor2, density);
      color = mix(color, uColor3, fbm(pos * 0.8 + uTime * 0.2));

      float alpha = density * uDensity;

      gl_FragColor = vec4(color, alpha);
    }
  `
);

extend({ NebulaMaterial });

const NebulaCloud = ({ position, scale }: { position: [number, number, number], scale: number }) => {
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <nebulaMaterial ref={materialRef} transparent side={THREE.DoubleSide} />
    </mesh>
  );
};

export default NebulaCloud;
