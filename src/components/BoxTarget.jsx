import { Box } from '@react-three/drei';
import FakeGlowMaterial from './FakeGlowMaterial';
import { useState } from 'react';

export default function BoxTarget({
  position,
  color = 'white',
  size = [5, 5, 5],
  onClick,
  shaderControls,
}) {
  // value of glowInternalRadius
  const [girVal, setGirVal] = useState(shaderControls.glowInternalRadius.value);
  function handleClick() {
    setGirVal(-1.8);
    onClick();
  }

  const controls = {...shaderControls, glowInternalRadius: girVal };

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