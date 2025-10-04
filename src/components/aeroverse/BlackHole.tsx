import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

const BlackHoleMaterial = shaderMaterial(
  {
    uTime: 0,
    uEventHorizon: 0.3,
  },
  `
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float uTime;
    uniform float uEventHorizon;
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(vUv, center);

      float angle = atan(vUv.y - center.y, vUv.x - center.x);
      angle += uTime * 2.0;

      float spiral = sin(dist * 20.0 - uTime * 3.0 + angle * 3.0) * 0.5 + 0.5;

      vec3 color = vec3(0.0);

      if (dist < uEventHorizon) {
        color = vec3(0.0);
      } else {
        float edge = smoothstep(uEventHorizon, uEventHorizon + 0.1, dist);
        float glow = 1.0 - smoothstep(uEventHorizon, uEventHorizon + 0.3, dist);

        vec3 accentColor = mix(
          vec3(1.0, 0.4, 0.0),
          vec3(0.0, 0.6, 1.0),
          spiral
        );

        color = accentColor * glow * edge;
        color += vec3(1.0) * pow(glow, 4.0) * 2.0;
      }

      float alpha = dist < uEventHorizon ? 1.0 : (1.0 - smoothstep(uEventHorizon, 1.0, dist));

      gl_FragColor = vec4(color, alpha);
    }
  `
);

extend({ BlackHoleMaterial });

const BlackHole = () => {
  const materialRef = useRef<any>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[8, 3, -5]}>
      <circleGeometry args={[2, 64]} />
      <blackHoleMaterial ref={materialRef} transparent side={THREE.DoubleSide} />
    </mesh>
  );
};

export default BlackHole;
