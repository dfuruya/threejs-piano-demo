import { Box } from '@react-three/drei';
import FakeGlowMaterial from './FakeGlowMaterial';
import { useRef } from 'react';
import { useTimer } from 'use-timer';
import { useFrame } from '@react-three/fiber';
import { KEYS_SHADER_DEFAULTS } from '../consts/keysShader';

export default function BoxTarget({
  position,
  color = 'white',
  size = [5, 5, 5],
  onClick,
}) {
  const shaderControls = KEYS_SHADER_DEFAULTS;
  const defaultGirValue = shaderControls.glowInternalRadius;
  console.log(defaultGirValue);
  const girVal = useRef(defaultGirValue);
  const { time, start, pause, reset, status } = useTimer({ interval: 1 });

  useFrame(() => {
    if (status === "RUNNING") {
      if (girVal.current < defaultGirValue) {
        girVal.current += 0.05;
      }
      if (time >= 1500) {
        pause();
        reset();
        girVal.current = defaultGirValue;
      }
    }
  });

  function handleClick() {
    girVal.current = -1.8;
    start();
    onClick();
  }

  const controls = {
    ...shaderControls, 
    glowInternalRadius: girVal.current,
  };

  return (
    <>
      <Box
        castShadow
        position={position}
        args={size}
        onClick={handleClick}
      >
        <meshStandardMaterial
          attach="material"
          color={color}
          castShadow
        />
      </Box>
      <Box
        position={position}
        args={size}
      >
        <FakeGlowMaterial {...controls } />
      </Box>
    </>
  );
}