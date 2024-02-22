import { Box } from '@react-three/drei';
import FakeGlowMaterial from './FakeGlowMaterial';

export default function BoxTarget({
  position,
  color = 'white',
  size = [5, 5, 5],
  onClick,
  shaderControls,
}) {
  return (
    <>
      <Box
        castShadow
        position={position}
        args={size}
        onClick={onClick}
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
        <FakeGlowMaterial {...shaderControls} />
      </Box>
    </>
  );
}