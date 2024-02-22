import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Plane, OrbitControls, Text } from '@react-three/drei';
import Piano from './components/Piano/Piano';
import { ROTATE_90_DEGREES, ROTATE_X_DEGREES } from './consts/math';
// import { Bloom, EffectComposer } from '@react-three/postprocessing';
// import Megaphone from './Megaphone'; /* highlight-line */

export default function App() {
  return (
    <Canvas
      camera={{ position: [100, 50, 0], fov: 50 }}
      shadows={'soft'}
      style={{
        backgroundColor: '#444',
        width: '100vw',
        height: '100vh',
      }}
    >
      <ambientLight intensity={1} />
      <directionalLight
        position={[0, 400, 0]}
        intensity={10}
        castShadow
        shadow-mapSize={1024}
      />
      {/* <Suspense fallback={null}>
        <Megaphone position={[0, 2, 0]} />
      </Suspense> */}
      <Piano />
      <Plane
        receiveShadow
        rotation={ROTATE_90_DEGREES}
        position={[0, 0, 0]}
        args={[100, 100]}
      >
        <meshStandardMaterial
          attach="material"
          color="white"
          // wireframe
        />
        <Text
          castShadow
          color="black"
          anchorX="center"
          anchorY="middle"
          rotation={ROTATE_X_DEGREES}
          position={[0, 0, 2]}
        >
          HELLO WORLD!
        </Text>
      </Plane>
      {/* <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer> */}
      <OrbitControls />
    </Canvas>
  );
}
