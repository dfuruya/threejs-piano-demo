import { useEffect, useState } from "react";
import BoxTarget from "../BoxTarget";
import useOscillator from "../../hooks/useOscillator";
import { NOTES_PER_OCTAVE } from "../../consts/audio";
import { useControls } from "leva";
import { KEYS_SHADER_DEFAULTS } from "../../consts/keysShader";

export default function Piano({
  octave = 4,
}) {
  const [keys, setKeys] = useState([]);
  const { playNote } = useOscillator();
  const shaderControls = useControls(KEYS_SHADER_DEFAULTS)

  useEffect(() => {
    let allKeys = [];
    for (let i = 0; i < 13; i++) {
      if (i !== 5) {
        allKeys.push(getPos(i));
      }
    }
    setKeys(allKeys);
  }, []);

  function getPos(i) {
    const isOdd = i % 2;
    return { offset: i / 2, isBlack: isOdd };
  }

  function onClick(i) {
    const index = NOTES_PER_OCTAVE * octave + i;
    playNote(index);
  }

  return keys.map((k, i) => (
    <BoxTarget
      key={`key-${k.offset}`}
      position={[-40, k.isBlack ? 10 : 5, k.offset * -5]}
      color={k.isBlack ? 'black' : 'white' }
      size={[4, 4, 4]}
      shaderControls={shaderControls}
      onClick={() => onClick(i)}
    />
  ));
}