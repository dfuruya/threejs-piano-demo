import React, { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Plane, OrbitControls } from '@react-three/drei';
import Megaphone from './Megaphone'; /* highlight-line */

const ROTATE_90_DEGREES = [-Math.PI / 2, 0, 0];

export default function App() {
  return (
    <Canvas
      camera={{ position: [200, 200, 0], fov: 25 }}
      shadows={'soft'}
      style={{
        backgroundColor: '#444',
        width: '100vw',
        height: '100vh',
      }}
    >
      <ambientLight intensity={0.5} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[0, 400, -50]}
        intensity={10}
        castShadow
        shadow-mapSize={1024}
      />
      <Suspense fallback={null}>
        <Megaphone castShadow position={[0, 2, 0]} />
      </Suspense>
      <Plane
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        args={[100, 100]}
      >
        <meshStandardMaterial
          attach="material"
          color="white"
          // wireframe
        />
      </Plane>
      <OrbitControls />
    </Canvas>
  );
}
